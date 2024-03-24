// console.log

// const { MongoClient } = require('mongodb');

// const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// async function retrieveData(mongodbUri, movies, all_movies, query = {}) {
//   // Connect to the MongoDB server
//   const client = new MongoClient(mongodbUri);
  
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
    
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Perform a query to retrieve data
//     const documents = await collection.find(query).toArray();

//     console.log(documents);
//     return documents;
//   } catch (err) {
//     console.error('An error occurred:', err);
//   } finally {
//     // Ensure that the client will close when you finish/error
//     await client.close();
//   }
// }
// const { MongoClient } = require('mongodb');

// const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const dbName = 'movies';
// const collectionName = 'all_movies';
// const query = {};


// const client = new MongoClient(mongodbUri);

// async function retrieveData(mongodbUri, dbName, collectionName, query) {
//   // Connect to the MongoDB server
//   const client = new MongoClient(mongodbUri);
  
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
    
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Perform a query to retrieve data
//     const documents = await collection.find(query).toArray();

//     console.log(documents);
//     return documents;
//   } catch (err) {
//     console.error('An error occurred:', err);
//   } finally {
//     // Ensure that the client will close when you finish/error
//     await client.close();
//   }
// }

// Example usage
// const mongodbUri = 'your_mongodb_uri'; // Replace with your MongoDB URI
// const dbName = 'your_db_name'; // Replace with your database name
// const collectionName = 'your_collection_name'; // Replace with your collection name
// const query = { 'some_field': 'some_value' }; // Customize your query

// retrieveData(mongodbUri, dbName, collectionName, query)
//   .then(data => console.log('Query result:', data))
//   .catch(err => console.error(err));


// const { MongoClient } = require('mongodb');

// const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// async function retrieveData(mongodbUri, dbName, collectionName, query = {}) {
//   // Connect to the MongoDB server
//   const client = new MongoClient(mongodbUri);
  
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
    
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Perform a query to retrieve data
//     const documents = await collection.find(query).toArray();

//     console.log(documents);
//     return documents;
//   } catch (err) {
//     console.error('An error occurred:', err);
//   } finally {
//     // Ensure that the client will close when you finish/error
//     await client.close();
//   }
// }

const { MongoClient } = require('mongodb');

const mongodbUri = 'mongodb+srv://chimou:capstone@cluster0.ovtlhby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'movies';
const collectionName = 'all_movies';
const query = {};


const client = new MongoClient(mongodbUri);

async function retrieveData(mongodbUri, dbName, collectionName, query) {
  // Connect to the MongoDB server
  const client = new MongoClient(mongodbUri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Perform a query to retrieve data
    const documents = await collection.find(query).toArray();

    console.log(documents);
    return documents;
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

retrieveData(mongodbUri, dbName, collectionName, query)
  .then(data => console.log('Query result:', data))
  .catch(err => console.error(err));
