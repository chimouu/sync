// backend/controllers/reviewController.js
const Review = require('../models/review');
const Movie = require('../models/movie'); // You'll need this if you want to validate the movie exists

exports.addReview = async (req, res) => {
  try {
    const movieExists = await Movie.findById(req.body.movie);

    // Create the review
    const review = new Review({
      movie: req.body.movie,
      author: req.body.author, // Ensure the author's ID is passed correctly
      content: req.body.content.trim(), // Trim whitespace
      rating: req.body.rating,
    });

    // Validate the review data
    const validationError = review.validateSync();
    if (validationError) {
      // Send back the validation errors
      return res.status(400).json(validationError);
    }

    // Save the review to the database
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Function to get all reviews for a specific movie
exports.getReviewsForMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId; // Assuming you're passing the movieId in the route parameter
    const reviews = await Review.find({ movie: movieId }).populate('author', 'name'); // Adjust according to your Author model

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
};

module.exports = router; // Export the router at the end
