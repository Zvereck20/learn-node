const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
