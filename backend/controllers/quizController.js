const { MongoClient } = require('mongodb');
const mongodbUri = process.env.MONGODB_URI;
const dbName = 'movies';
const collectionName = 'all_quizzes';

// Helper function to connect to MongoDB and get the collection
async function getCollection() {
  const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName).collection(collectionName);
}

// Fetch quizzes by title or all quizzes if no title is provided
async function fetchQuizzes(req, res) {
  try {
    const { title } = req.query;
    const collection = await getCollection();
    const query = title ? { "quizzes.title": title } : {};
    const quizData = await collection.find(query).toArray();
    res.json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching quizzes.');
  }
}

module.exports = {
  fetchQuizzes,
};