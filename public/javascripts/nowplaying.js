// API WE WILL CALL FIRSTLy

// const { response } = require("express");

//THIS IS MY API ------------ Abhianv KEY
const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const APIURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + APIKEY;
const imageURL = "https://image.tmdb.org/t/p/w500";
const searchURL = baseURL + "/search/movie?" + APIKEY;
const trendingURL = baseURL+"/trending/all/day?language=en-US&"+APIKEY;
const upcomingURL =baseURL+"/movie/upcoming?language=en-US&page=1&"+APIKEY;
const tvshowsURL = baseURL+"/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&"+APIKEY;
const topratedURL = baseURL+"/movie/top_rated?language=en-US&page=1&"+APIKEY;
const popularURL =baseURL+"/movie/popular?language=en-US&page=1&"+APIKEY;
const peopleURL = baseURL+"/trending/person/day?language=en-US&"+APIKEY;
const nowplayingURL = baseURL+"/movie/now_playing?language=en-US&page=1&"+APIKEY;

const search = document.querySelector(".search");
const form = document.querySelector(".form");

const movielist = document.querySelector(".main-movie");

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;



getMovies(nowplayingURL);

function getMovies(url) {
  lastUrl = url
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      // showDetails(data.results);
      if(data.results.length !==0){
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if(currentPage <= 1){
          prev.classList.add('disabled');
          next.classList.remove('disabled')
        }else if(currentPage>= totalPages){
          prev.classList.remove('disabled');
          next.classList.add('disabled')
        }else{
          prev.classList.remove('disabled');
          next.classList.remove('disabled')
        }
      }
      else{
        movielist.innerHTML= `<h1 class="no-results">No Results Found</h1>`
      }
    });
}

// RECOMENDED MOVIES


function showMovies(data) {
  movielist.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id, vote_count,overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.id = `${id}`;
    movieEl.innerHTML = `
             <img src="${imageURL + poster_path}" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(
                  vote_average
                )}">${vote_average.toFixed(1)}</span>          
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <h4>${vote_count}k Votes</h4>
                <br>
                <p>${overview}</p> 
                <br>
                <a href="/toprated"><button class="know-more" id="${id}">Book Now</button</a>
            </div>
            
        
        `;
                  movieEl.addEventListener("click", function(){
                    selectDiv(this.id)
                    console.log(this.id)
                  });
                  function selectDiv(divId) {
                    fetch(`/home/${divId}`, { method: 'GET' })
                        // .then(response => response.text())
                        .then(response => {
                          if (!response.ok) {
                              throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
                          }
                          // Assuming the response is successful, redirect to another route
                          window.location.href = '/toprated';
                          return response.text();
                      })
                        .then(message => console.log(message))
                        .catch(error => console.error(error));
                        
                }
    movielist.appendChild(movieEl);
   
    
  });
//   document.addEventListener('DOMContentLoaded', function () {
//   movieEl.forEach(element => {
//     element.addEventListener('click', function () {
      
//       const movie_id = element.getAttribute(id);
//       console.log(movie_id)
//       window.location.href = `/book/${movie_id}`;
//   })
// })})
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
    getMovies(nowplayingURL);
  }
});

getSwiperMovies(trendingURL);

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
    movieElement.id = `${id}`;
    movieElement.innerHTML = `
        <div class="swiper-content">
        <img src="${imageURL + poster_path}" id="${id}" >
        
        <div class="details-swiper">
        
          <h1>${title}</h1>
          <span class="${getColor(
            vote_average
          )}">${vote_average.toFixed(1)}</span> 
          <h3>${vote_count}k Reviews</h3>
          <button class="know-more-swiper" onclick="selectDiv(this.id)"id="${id}">Book Now</button>
        
        </div>
        
        
        `;
        movieElement.addEventListener("click", function(){
          selectDiv(this.id)
          console.log(this.id)
        });
        function selectDiv(divId) {
          fetch(`/home/${divId}`, { method: 'GET' })
              // .then(response => response.text())
              .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
                }
                // Assuming the response is successful, redirect to another route
                window.location.href = '/toprated';
                return response.text();
            })
              .then(message => console.log(message))
              .catch(error => console.error(error));
              
      }
    manymovies.appendChild(movieElement);
  });
}


prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}