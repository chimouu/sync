const Quiz = require('../models/Quiz');
const { generateQuizForMovie } = require('../services/quizService'); // Assuming this is your existing function

exports.createQuizForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const quizData = await generateQuizForMovie(movieId);
    const quiz = new Quiz({ movie: movieId, ...quizData });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// This assumes `generateQuizForMovie` fetches or generates the quiz questions and answers based on the movie ID.
