const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController'); // Adjust the path as necessary

router.get('/quizzes', quizController.fetchQuizzes);

module.exports = router;
