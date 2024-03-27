const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  movie: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
