const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

const {
  getRequisitions,
  addRequisition,
  getRequisitionsCount,
} = require("./requisitions.controller");

const { addUser, loginUser } = require("./user.controller");

app.use(express.json());
app.use(cookieParser());

app.post("/create-requisition", async (req, res) => {
  const requisition = await addRequisition(req.body);

  res.send({
    requisition,
  });
});

app.post("/verification-user", async (req, res, next) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });

    res.send("Пользователь найден");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/orders", async (req, res) => {
  const token = req.cookies.token;

  try {
    const siVerifyUser = jwt.verify(token, JWT_SECRET);

    const { page, limit } = req.query;

    const requisitions = await getRequisitions(req.query);
    const count = await getRequisitionsCount();
    
    res.send({
      requisitions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

mongoose
  .connect(
    "mongodb+srv://zvereck27:sAenXTPcTnvkpXVy@cluster0.2rpqk.mongodb.net/collection?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    // await addUser("test@test.ru", "Pass@27");

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`);
    });
  });
