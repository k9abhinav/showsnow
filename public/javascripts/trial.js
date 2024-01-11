const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";
const popularURL =baseURL+"/movie/popular?language=en-US&page=1&"+APIKEY;
// const tvshowsURL = baseURL+"/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&"+APIKEY;
// const tvshowsURL = `${baseURL}/discover/tv/${movieId}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&${APIKEY}`;
const thisdiv = document.querySelector(".thisdiv").textContent;
console.log(thisdiv)
// Replace this with the specific movie ID you want to fetch
const movieId = thisdiv;

const APIURL = `${baseURL}/movie/${movieId}?language=en-US&${APIKEY}`;

getMovieDetails(APIURL);

function getMovieDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data);
    //   console.log(data)
    });
}
// getDetails(APIURL, tvshowsURL);

// function getDetails(APIURL, tvshowsURL) {
//   fetch(APIURL)
//     .then((res) => {
//       if (!res.ok) {
//         // If movie details not found, fetch TV show details
//         return fetch(tvshowsURL);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       showDetails(data);
//       // console.log(data);
//     });
// }

const detailsmain = document.querySelector(".main-detail");

function showDetails(movie) {
  detailsmain.innerHTML = "";

  const {
    title,
    name,
    poster_path,
    vote_average,
    backdrop_path,
    vote_count,
    release_date,
    overview,
  } = movie;

  const movieDetails = document.createElement("div");
  movieDetails.id = thisdiv;
  movieDetails.classList.add("container");
  movieDetails.innerHTML = `
    <!-- Your HTML template for displaying movie details goes here -->
    <div class="imgclass">
    <div class="up-content">
    <div class="img1">
        <img src="${imageURL + poster_path  }" alt=" ${title || name}" />
    </div>
    <div class="content">
        <div class="name">
            ${title || name}
        </div>
        <div class="star">
            Ratings - ${vote_average.toFixed(1)}/10
        </div>
        <div class="lang">
           Released on : ${release_date}
        </div>
        <div class="bio">
            ${vote_count}K Reviews
        </div>
        <div class="bookticket">
            <button class="btn" id="${movieDetails.id}" onclick="getdivid()">Book Tickets</button>
        </div>
    </div>
</div>
</div>
    <div class="down-content">
            <h2 class="heading2">
                About the movie
            </h2>
            <p>
               ${overview}
            </p>
        </div>

  `;
  
  detailsmain.appendChild(movieDetails);
}
function getdivid() {
    window.location.href = '/paymentsummary';

//     console.log("Requesting movie ID:", thatId);
  
//     fetch(`/toprated/${thatId}`, { method: 'GET' })
//       .then(response => {
//         console.log("Response received:", response);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
//         }
//         console.log("Request successful. Redirecting to /seats.");
//         window.location.href = '/seats';
//       })
//       .catch(error => console.error(error));
  }
  
