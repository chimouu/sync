const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  choices: [String],
  correct_answer: String
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

const QuizCollection = mongoose.model('QuizCollection', quizSchema);

module.exports = QuizCollection;
