const Movie = require('../models/Movie'); // Adjust the path as necessary
const { getMovieRecommendations } = require('../services/recommendationService'); // Import the recommendation service

// Existing functions remain unchanged

// Function to get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// New function to fetch movie recommendations
exports.fetchRecommendations = async (req, res) => {
  try {
    // Here, you might extract user preferences or criteria from `req.body` or `req.query`
    // For the sake of simplicity, let's call the service without parameters
    const recommendations = await getMovieRecommendations();
    res.json(recommendations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
