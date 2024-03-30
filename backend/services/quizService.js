// const axios = require('axios');
// const { MongoClient } = require('mongodb');
// const api_key = process.env.THE_MOVIE_DB_API_KEY;
// const openai_api_key = process.env.OPENAI_API_KEY;
// const mongodbUri = process.env.MONGODB_URI;
// const dbName = 'movies';
// const collectionName = 'all_movies';
// const collectionName1 = 'all_quizzes';

// // Assuming Movie model and other imports are correctly set up above

// const getMovieByTitle = async (title) => {
//   const client = new MongoClient(mongodbUri);
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     const query = { title: { $regex: new RegExp(title, 'i') } };
//     const movie = await collection.findOne(query);
//     if (!movie) {
//       throw new Error("No movie found with that title");
//     }
//     return movie;
//   } finally {
//     await client.close();
//   }
// };

// const generateQuiz = async (movie) => {
//   const prompt = `${movie} . Generate 5 multiple-choice questions with 4 answer choices each, where one of the choices is correct and the others are plausible but incorrect.`;
//   const headers = { Authorization: `Bearer ${openai_api_key}` };
//   const data = { prompt, temperature: 0.5, max_tokens: 1024, top_p: 1, frequency_penalty: 0, presence_penalty: 0 };
//   const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
//   if (response.status !== 200) {
//     throw new Error("Failed to generate quiz from OpenAI");
//   }
//   return response.data.choices[0].text;
// };

// const saveQuizToDatabase = async (movieTitle, quizContent) => {
//   const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const quizzes = db.collection(collectionName1);
//     const doc = { movieTitle, quizContent, createdAt: new Date() }; // Removed undefined 'user' property
//     const result = await quizzes.insertOne(doc);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     await client.close();
//   }
// };

// const generateQuizForMovie = async (title) => {
//   const movie = await getMovieByTitle(title);
//   const quizContent = await generateQuiz(movie);
//   await saveQuizToDatabase(title, quizContent);
//   return quizContent;
// };

// module.exports = { generateQuizForMovie };



// quizService.js

// const axios = require('axios');
// const { MongoClient } = require('mongodb');

// // Assuming environment variables are set for API keys and MongoDB URI
// const api_key = process.env.THE_MOVIE_DB_API_KEY;
// const openai_api_key = process.env.OPENAI_API_KEY;
// const mongodbUri = process.env.MONGODB_URI;
// const dbName = 'movies';
// const collectionName = 'all_quizzes';
// const express = require('express');
// const router = express.Router();

// // Helper function to connect to MongoDB
// async function connectToMongoDB() {
//   const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();
//   return client;
// }
// // Fetch quizzes by title or all quizzes if no title is provided
// router.get('/quizzes', async (req, res) => {
//   try {
//     const { title } = req.query;
//     const query = title ? { "quizzes.title": title } : {}; // Adjust based on actual data structure
//     const quizData = await collectionName.find(query);
//     res.json(quizData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching quizzes.');
//   }
// });

// module.exports = router;

// const axios = require('axios');
// const { MongoClient } = require('mongodb');
// const express = require('express');
// const router = express.Router();

// // Assuming environment variables are set for API keys and MongoDB URI
// const mongodbUri = process.env.MONGODB_URI;
// const dbName = 'movies';
// const collectionName = 'all_quizzes';

// // Helper function to connect to MongoDB and get the collection
// async function getCollection() {
//   const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();
//   return client.db(dbName).collection(collectionName);
// }

// // Fetch quizzes by title or all quizzes if no title is provided
// router.get('/quizzes', async (req, res) => {
//   try {
//     const { title } = req.query;
//     const collection = await getCollection();
//     const query = title ? { "quizzes.title": title } : {}; // Adjust based on actual data structure
//     const quizData = await collection.find(query).toArray(); // Convert the cursor to an array
//     res.json(quizData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching quizzes.');
//   }
// });

// module.exports = router;

// quizController.js


