// const Movie = require('./Movie'); // Ensure this path is correct
const fetchcomedies = require('../models/fetchcomedies');

// Now you can call fetchcomedies()
async function insertMovies() {
  const moviesData = await fetchcomedies(); // Fetch movies from the API

  for (const movieData of moviesData) {
    const movie = new Movie({
      // Map the movieData fields to your Movie schema fields here
      title: movieData.original_title,
      plot: movieData.overview,
      coverImage: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
      releaseDate: movieData.release_date,
      genre_ids: movieData.genre_ids, // Consider mapping IDs to genre names if necessary
    });

    try {
      await movie.save();
      console.log(`Saved movie: ${movie.title}`);
    } catch (error) {
      console.error('Failed to save movie:', error.message);
    }
  }
}

insertMovies();