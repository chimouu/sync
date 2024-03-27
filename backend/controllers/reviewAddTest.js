const axios = require('axios');
const { ObjectId } = require('mongodb');
const objectId = new ObjectId('65fa19b0feb60396e0f4afad');




const formData = {
    movie: objectId,
    author: 'admin',
    content: 'Good movie.',
    rating: 5
};

axios.post('http://localhost:3000/api/reviews/addReview', formData)
    .then(response => {
        console.log('Review added:', response.data);
    })
    .catch(error => {
        console.error('Error adding review:', error);
    });
