const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to add a new review
router.post('/', reviewController.addReview);

// Route to get reviews for a specific movie
router.get('/movie/:movieId', reviewController.getReviewsForMovie);

module.exports = router;
