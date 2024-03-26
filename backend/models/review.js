const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
