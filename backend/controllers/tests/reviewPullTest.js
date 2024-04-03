const axios = require('axios');
const { ObjectId } = require('mongodb');

describe('GET /api/reviews/getAllReviews', () => {
  test('should fetch all reviews for a specific movie', async () => {
    const response = await axios.get(`http://localhost:3000/api/reviews/movie/${movieId}`); // Adjust the URL to match your test server

    // Status code check
    expect(response.status).toBe(200);

    // Adjust expectations according to your data structure
    expect(response.data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: '65fa19b0feb60396e0f4afad',
        movie: expect.anything(), // Assuming the response includes the movie ID
        author: 'admin',
        content: 'Good Movie.',
        rating: 5,
      })
    ]));
  });
});
