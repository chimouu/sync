const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  _id: String,
  adult: Boolean,
  backdropPath: String,
  genreIds: [Number], // Since genres are provided as an array of IDs
  movieId: {
    type: Number,
    unique: true, // Assuming each movie has a unique ID
    required: true
  },
  originalLanguage: String,
  originalTitle: String,
  overview: String,
  popularity: Number,
  posterPath: String,
  releaseDate: Date, // Mongoose can automatically convert strings to dates
  title: String,
  video: Boolean,
  voteAverage: Number,
  voteCount: Number
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

const Movie = mongoose.model('Movie', movieSchema, 'all_movies');


module.exports = Movie;

