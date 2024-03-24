const { MongoClient } = require('mongodb');

const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'movies';
const collectionName = 'all_movies';

async function retrieveMovieOverviewByTitle(title) {
  const client = new MongoClient(mongodbUri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Using a case-insensitive regex to match the title and projecting to get only the overview
    const query = { title: { $regex: new RegExp(title, 'i') } };
    const projection = { projection: { _id: 0, overview: 1 } };

    const movie = await collection.findOne(query, projection);
    
    if (movie) {
      console.log("Movie overview:", movie.overview);
      return movie.overview;
    } else {
      console.log("No movie found with that title.");
      return null;
    }
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

// Replace with the actual title you are searching for
const userInputTitle = "Poor Things";
retrieveMovieOverviewByTitle(userInputTitle).then(overview => {
  if (overview) {
    console.log("Retrieved movie overview:", overview);
  } else {
    console.log("No overview found for that title.");
  }
}).catch(error => {
  console.error("Failed to retrieve movie overview:", error);
});

