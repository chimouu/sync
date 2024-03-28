const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Correct route definition using 'title' as the parameter
router.get('/movie/:title/quiz', quizController.generateQuizForMovieController);

module.exports = router;
