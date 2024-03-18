const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  questions: [{
    questionText: String,
    options: [String], // Array of options
    correctAnswer: String
  }]
  // You can add more fields as necessary
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
