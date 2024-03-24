require('dotenv').config();
const mongoose = require('mongoose');
const fetchcomedies = require('./fetchcomedies'); // Update the path
const Movie = require('./Movie'); // Update the path to your Mongoose model

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function storeMovies() {
  const movies = await fetchcomedies();
  
  // Assuming 'movies' is an array of movie objects
  for (const movieData of movies) {
    try {
      const movie = new Movie({
        // Map the fields from movieData to your schema fields
        // This might involve renaming fields, transforming data formats, etc.
        adult: movieData.adult,
        backdropPath: movieData.backdrop_path,
        genreIds: movieData.genre_ids,
        movieId: movieData.id, // Assuming you have a movieId field in your schema
        originalLanguage: movieData.original_language,
        originalTitle: movieData.original_title,
        overview: movieData.overview,
        popularity: movieData.popularity,
        posterPath: movieData.poster_path,
        releaseDate: new Date(movieData.release_date),
        title: movieData.title,
        video: movieData.video,
        voteAverage: movieData.vote_average,
        voteCount: movieData.vote_count,
      });
      
      await movie.save(); // Save the movie document to MongoDB
      console.log(`Movie saved: ${movie.title}`);
    } catch (err) {
      console.error('Error saving movie:', err);
    }
  }

  // Optional: Disconnect from MongoDB once done
  mongoose.disconnect();
}

storeMovies();
