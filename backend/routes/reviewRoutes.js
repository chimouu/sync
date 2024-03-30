// const express = require('express');
// const router = express.Router();
// const { getAllReviews, addReview, getReviewsForMovie } = require('../controllers/reviewController');


// // Route to add a new review
// router.get('/', getAllReviews);
// router.post('/addReview', addReview);
// // Route to get reviews for a specific movie
// router.get('/movie/:movieId', getReviewsForMovie);

// module.exports = router;

const express = require('express');
const { getReviews, addReview } = require('../controllers/reviewController'); // Adjust the path as necessary
const router = express.Router();

router.get('/reviews', getReviews);
router.post('/reviews', addReview);

module.exports = router;

