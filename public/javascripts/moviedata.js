// API WE WILL CALL FIRSTLy

// const { response } = require("express");

//THIS IS MY API KEY
const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const APIURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + APIKEY;
const imageURL = "https://image.tmdb.org/t/p/w500";
const searchURL = baseURL + "/search/movie?" + APIKEY;

const search = document.querySelector(".search");
const form = document.querySelector(".form");

getMovies(APIURL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      // showDetails(data.results);
      showMovies(data.results);
    });
}

// RECOMENDED MOVIES
const movielist = document.querySelector(".main-movie");

function showMovies(data) {
  movielist.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id, vote_count } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
             <img src="${imageURL + poster_path}" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(
                  vote_average
                )}">${vote_average}</span>          
            </div>
            <div class="overview">
                <h3>${title}</h3>
                ${vote_count}k Votes
                <br/> 
                <a href="/paymentform"><button class="know-more" id="${id}">Know More</button</a>
            </div>
            
        
        `;

    movielist.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(APIURL);
  }
});

getSwiperMovies(APIURL);

function getSwiperMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      // showDetails(data.results);
      swiperMovies(data.results);
    });
}

const manymovies = document.querySelector(".swiper-wrapper");

function swiperMovies(data) {
  manymovies.innerHTML = "";

  data.forEach((movies) => {
    const { title, poster_path, vote_average, id, vote_count, overview } =
      movies;
    const movieElement = document.createElement("div");
    movieElement.classList.add("swiper-slide");
    movieElement.innerHTML = `
        <div class="swiper-content">
        <img src="${imageURL + poster_path}" id="${id}" >
        
        <div class="details-swiper">
        
          <h1>${title}</h1>
          <span class="${getColor(
            vote_average
          )}">${vote_average}</span> 
          <h3>${vote_count}k Reviews</h3>
          <a href="/paymentform"><button class="know-more-swiper" id="${id}">Know More</button</a>
        
        </div>
        
        
        `;

    manymovies.appendChild(movieElement);
  });
}
