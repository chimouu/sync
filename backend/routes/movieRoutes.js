const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieByTitle } = require('../controllers/movieController');


// Route to get all movies
router.get('/', getAllMovies);
router.get('/:title', getMovieByTitle);

// // Route to get recommendation service
// router.get('/recommendations', movieController.fetchRecommendations);

module.exports = router;
