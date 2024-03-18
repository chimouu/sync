// const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  overview: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: false
  },
  releaseDate: {
    type: Date,
    required: false
  },
  genre_ids: {
    type: [Integer], // Array of genres
    required: false
  },
  // Include other fields as needed
});
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('./models/Movie'); // Make sure this path is correct based on your project structure

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB:', err));

const fetchAndStoreMovies = async () => {
  try {
    // Replace 'https://example.com/api/movies' with the actual API endpoint you're using
    const response = await axios.get('"https://api.themoviedb.org/3/search/movie?api_key=14d60f3530647ba7d89f7c3d37a1165e&query={movie_name}"');
    
    // Adjust this according to the structure of your API response
    // This assumes the API returns an array of movie objects
    const movies = response.data; 

    for (const movieData of movies) {
      // Destructure the movieData object according to your external API's response structure
      const { title, plot, coverImage, releaseDate, genre } = movieData;
      
      // Check for existing movie to avoid duplicates
      // Use a more unique identifier if available (e.g., an external movie ID)
      const existingMovie = await Movie.findOne({ title: title });

      if (!existingMovie) {
        const movie = new Movie({
          title,
          plot,
          coverImage,
          releaseDate: new Date(releaseDate), // Ensuring correct date format
          genre
        });

        await movie.save(); // Save the new movie to the database
      } else {
        console.log(`Movie "${title}" already exists. Skipping...`);
        // Optionally, you could update existing records here
      }
    }

    console.log('Movies have been fetched and stored.');
  } catch (error) {
    console.error('Failed to fetch and store movies:', error.message);
  } finally {
    mongoose.disconnect(); // Close the MongoDB connection once the operation is complete
  }
};

fetchAndStoreMovies();


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
