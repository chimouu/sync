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

const axios = require('axios');
const { MongoClient } = require('mongodb');

// Assuming environment variables are set for API keys and MongoDB URI
const api_key = process.env.THE_MOVIE_DB_API_KEY;
const openai_api_key = process.env.OPENAI_API_KEY;
const mongodbUri = process.env.MONGODB_URI;
const dbName = 'movies';
const collectionName = 'TMBD_movie';
const collectionName1 = 'all_quizzes';

// Helper function to connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
}

// Function to retrieve a movie by title from MongoDB
async function getMovieByTitle(title) {
  const client = await connectToMongoDB();
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = { title: { $regex: new RegExp(title, 'i') } };
    const movie = await collection.findOne(query);
    if (!movie) {
      throw new Error("No movie found with that title");
    }
    return movie;
  } finally {
    await client.close();
  }
}

// Function to generate a quiz using OpenAI API
async function generateQuiz(movie) {
  const prompt = ` ${movie} . Generate 5 multiple-choice questions with 4 answer choices each, where one of the choices is correct and the others are plausible but incorrect.Provide correct answers at the bottom`;
  const headers = { Authorization: `Bearer ${openai_api_key}` };
  const data = { prompt, temperature: 0.5, max_tokens: 1024, top_p: 1, frequency_penalty: 0, presence_penalty: 0 };
  
  const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
  if (response.status !== 200) {
    throw new Error("Failed to generate quiz from OpenAI");
  }
  return response.data.choices[0].text;
}

// Function to save the generated quiz to MongoDB
async function saveQuizToDatabase(movieTitle, quizContent) {
  const client = await connectToMongoDB();
  try {
    const db = client.db(dbName);
    const quizzes = db.collection(collectionName1);
    const doc = { movieTitle, quizContent, createdAt: new Date() };
    const result = await quizzes.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

// Main function to generate quiz for a given movie title
async function generateQuizForMovie(title) {
  const movie = await getMovieByTitle(title);
  const quizContent = await generateQuiz(movie);
  await saveQuizToDatabase(title, quizContent);
  return quizContent;
}

module.exports = {
  generateQuizForMovie,
};
