const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjMyY2EwNmJkY2E3NWQ5YWE2NjMzODRjNTc2OTZkNiIsInN1YiI6IjY1NjQ5OGExNWNlYTE4MDBmZmNjM2I1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ouOnZ4jwtYDYFLTAi7bEUUkp3qg9SE1VsN_JgrmQNqw'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));