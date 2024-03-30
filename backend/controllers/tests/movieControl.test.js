// In movieController.test.js
const { getAllMovies } = require('../movieController');
const Movie = require('../../models/movie'); // Assuming this is your model

// Mock the Movie model's find method
jest.mock('../models/movie', () => ({
  find: jest.fn().mockResolvedValue([{ title: 'Test Movie' }])
}));

describe('getAllMovies', () => {
    it('should return a list of movies', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
  
      await getAllMovies(req, res);
  
      // Check if res.json was called
      expect(res.json).toHaveBeenCalledWith([{ title: 'Test Movie' }]);
    });
  });
  