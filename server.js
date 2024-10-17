const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const Question = require("./models/Question");
const Answer = require("./models/Answer");

app.use(express.json());

app.get("/content", async (req, res) => {
  const questions = await Question.find();
  const answers = await Answer.find();
  res.send({
    questions,
    answers,
  });
});

app.post("/create-question", async (req, res) => {
  const { question, answers } = req.body;

  const creatingQuestion = await Question.create({ title: question });

  for (const { tempId, title, correct } of answers) {
    if (tempId !== "") {
      await Answer.create({ title, question_id: creatingQuestion.id, correct });
    }
  }

  const newAnswers = await Answer.find();

  res.send({
    question: creatingQuestion,
    answers: newAnswers,
  });
});

app.post("/create-answer", async (req, res) => {
  const { title, question_id, correct } = req.body;

  await Answer.create({ title, question_id, correct });
  res.send({ response: "Answer was creating" });
});

app.put("/save-changes", async (req, res) => {
  const { question, answers } = req.body;

  try {
    Object.keys(question).length &&
      (await Question.updateOne(
        { _id: question.id },
        { title: question.title }
      ));

    if (answers.length) {
      for (const { _id, title, correct } of answers) {
        await Answer.updateOne({ _id }, { title, correct });
      }
    }

    res.send({ response: "Editing finish" });
  } catch (error) {
    console.error("Editing error: ", error);
    res.send({ error });
  }
});

app.delete("/delete-question/:id", async (req, res) => {
  const questionId = req.params.id;

  await Question.deleteOne({ _id: questionId });
  await Answer.deleteMany({ question_id: questionId });

  res.send({ response: "Question was deleting" });
});

app.delete("/delete-answer/:id", async (req, res) => {
  await Answer.deleteOne({ _id: req.params.id });

  res.send({ response: "Answer was deleting" });
});

mongoose
  .connect(
    //Подключаемся к бд
    "mongodb+srv://zvereck27:sAenXTPcTnvkpXVy@cluster0.2rpqk.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    // await Question.create({
    //   title: "Title2",
    // });

    // await Answer.create({
    //   title: "Testing answer",
    //   question_id: "dont now",
    //   correct: false,
    // });

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`);
    });
  });
