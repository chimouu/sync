// const movie = require('../models/movie'); // Adjust the path as necessary
// const { getMovieRecommendations } = require('../services/recommendationService'); // Import the recommendation service
// const retrieveData = require('../models/funcs/getmovies');
// const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const dbName = 'movies';
// const collectionName = 'all_movies';

// // Existing functions remain unchanged

// // Function to get all movies
// const express = require('express');
// const router = express.Router();
// const retrieveData = require('./path/to/retrieveData');

// router.get('/movies', async (req, res) => {
//   try {
//     const dbName = 'movies';
//     const collectionName = 'all_movies';
//     const query = {}; // Adjust based on request, e.g., req.query for query parameters

//     const movies = await retrieveData(process.env.MONGODB_URI, dbName, collectionName, query);
    
//     res.json(movies);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('An error occurred while retrieving data');
//   }
// });

// // The controller function to retrieve a movie overview by title
// async function retrieveMovieOverviewByTitle(req, res) {
//   const title = req.params.title; // Assuming the title is sent as a URL parameter
//   const client = new MongoClient(mongodbUri);

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Using a case-insensitive regex to match the title and projecting to get only the overview
//     const query = { title: { $regex: new RegExp(title, 'i') } };
//     const projection = { projection: { _id: 0, overview: 1 } };

//     const movie = await collection.findOne(query, projection);

//     if (movie) {
//       console.log("Movie overview:", movie.overview);
//       res.json(movie);
//     } else {
//       console.log("No movie found with that title.");
//       res.status(404).send("No movie found with that title.");
//     }
//   } catch (err) {
//     console.error('An error occurred:', err);
//     res.status(500).send("An error occurred on the server.");
//   } finally {
//     await client.close();
//   }
// }



// // New function to fetch movie recommendations
// exports.fetchRecommendations = async (req, res) => {
//   try {
//     // Here, you might extract user preferences or criteria from `req.body` or `req.query`
//     // For the sake of simplicity, let's call the service without parameters
//     const recommendations = await getMovieRecommendations();
//     res.json(recommendations);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const retrieveData = require('../models/funcs/getmovies.js'); // Make sure the path is correct

const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'movies';
const collectionName = 'all_movies';

// Function to get all movies
exports.getAllMovies = async (req, res) => {
    console.log('getAllMovies called');
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

exports.getMovieByTitle = async (req, res) => {
    console.log('getMovieByTitle called');
  const title = req.params.title; // Extract title from URL parameters
  const client = new MongoClient(mongodbUri);

  try {
      await client.connect();
      console.log('Connected to MongoDB');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Use a case-insensitive regex to search for the movie title
      const query = { title: { $regex: new RegExp(title, 'i') } };
      // Adjust the projection as necessary
      const projection = { projection: { _id: 0, overview: 1 } };

      const movie = await collection.findOne(query);

      if (movie) {
          console.log("Movie found:", movie);
          res.json(movie);
      } else {
          console.log("No movie found with that title.");
          res.status(404).send("No movie found with that title.");
      }
  } catch (err) {
      console.error('An error occurred:', err);
      res.status(500).send("An error occurred on the server.");
  } finally {
      await client.close();
  }
};

// module.exports = router; // Export the router at the end
