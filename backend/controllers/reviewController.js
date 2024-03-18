// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Movie = require('../models/Movie'); // You'll need this if you want to validate the movie exists

// Function to add a new review
exports.addReview = async (req, res) => {
  try {
    // Optional: Check if the movie exists before adding a review
    const movieExists = await Movie.findById(req.body.movie);
    if (!movieExists) return res.status(404).send('Movie not found');

    const review = new Review({
      movie: req.body.movie,
      author: req.body.author, // Assume the author's ID is passed in the request
      content: req.body.content,
      rating: req.body.rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Function to get all reviews for a specific movie
exports.getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('author', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
