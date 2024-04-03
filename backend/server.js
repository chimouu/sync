const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the environment variables from the .env file

const app = express();

app.use(cors()); // Use the cors middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Define a simple route to test
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
const movieRoutes = require('./routes/movieRoutes');
// const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const quizRoutes = require('./routes/quizRoutes');
// const recRoutes = require('./routes/recsRoutes');

// Use the routes
app.use('/api/movies', movieRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
// Directly in your main server file, temporarily for testing
app.use('/api/quiz', quizRoutes);
// app.use('/api/recs', recsRoutes);

app.get('/api/test', (req, res) => {
  res.send('Test route is working');
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
