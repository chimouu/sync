const fetch = require('node-fetch');

const apiKey = '14d60f3530647ba7d89f7c3d37a1165e'; // Replace with your actual API key
const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
const params = `api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&primary_release_date.gte=2020-01-01&primary_release_date.lte=2023-12-31&with_original_language=en&region=US&with_origin_country=US`;

async function fetchMovies() {
  let allMovies = [];
  try {
    for (let page = 1; page <= 5; page++) { // Loop through 5 pages to get top 100 results
      const response = await fetch(`${baseUrl}?${params}&page=${page}`, {
        method: 'GET',
        headers: { accept: 'application/json' }
      });
      const data = await response.json();
      allMovies = allMovies.concat(data.results); // Combine results from each page
    }
    console.log(allMovies); // Process or output the combined results
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}
module.exports = fetchMovies;

fetchMovies();
