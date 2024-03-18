const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to get all movies
router.get('/', movieController.getMovies);

// Route to add a new movie
router.post('/', movieController.addMovie);

// Route to get recommendation service
router.get('/recommendations', movieController.fetchRecommendations);

module.exports = router;
