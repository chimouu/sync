const quizService = require('../services/quizService');
const { generateQuizForMovie } = require('../services/quizService');

// Controller to handle the route for generating a quiz for a movie
const generateQuizForMovieController = async (req, res) => {
  try {
    const title = req.params.title; // Extract the movie title from the request URL
    const quizContent = await quizService.generateQuizForMovie(title); // Generate the quiz using the provided title
    res.json({ success: true, quiz: quizContent }); // Send the generated quiz content back to the client
  } catch (error) {
    // Handle errors appropriately
    console.error('Error generating movie quiz:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  generateQuizForMovieController,
};

