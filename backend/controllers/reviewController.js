// backend/controllers/reviewController.js
const Review = require('../models/review');
const Movie = require('../models/movie'); // You'll need this if you want to validate the movie exists
const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'movies';
const collectionName = 'all_reviews';

exports.getAllReviews = async (req, res) => {
  console.log('getAllReviews called');
  const client = new MongoClient(mongodbUri);

  try {
      await client.connect();
      console.log('Connected to MongoDB');
      
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Optionally, you can adjust the query based on request parameters
      const query = {}; // Example: const query = req.query;
      const movies = await collection.find(query).toArray();

      // Send the movies as a response
      res.json(movies);
  } catch (err) {
      console.error('An error occurred:', err);
      res.status(500).send('An error occurred while retrieving data');
  } finally {
      await client.close();
  }
};

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

