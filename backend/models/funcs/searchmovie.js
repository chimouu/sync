const { MongoClient } = require('mongodb');

const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'movies';
const collectionName = 'all_movies';

// Function to retrieve movie details based on a user-inputted title
async function retrieveMovieByTitle(title1) {
  // Sanitize and validate the title input here if necessary
  const query = {title: title1};

  const client = new MongoClient(mongodbUri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = await collection.find(query).toArray();
    console.log(documents);
    return documents;
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

// Example user input
const userInputTitle = "Poor Things";

// Call the function with user input
retrieveMovieByTitle(userInputTitle).then(documents => {
  console.log("Retrieved documents:", documents);
}).catch(error => {
  console.error("Failed to retrieve documents:", error);
});