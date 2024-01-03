const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";
const popularURL =baseURL+"/movie/popular?language=en-US&page=1&"+APIKEY;


// Replace this with the specific movie ID you want to fetch
const movieId = 20759;

const APIURL = `${baseURL}/movie/${movieId}?language=en-US&${APIKEY}`;

getMovieDetails(APIURL);

function getMovieDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data);
      console.log(data)
    });
}

const detailsmain = document.querySelector(".main-detail");

function showDetails(movie) {
  detailsmain.innerHTML = "";

  const {
    title,
    poster_path,
    vote_average,
    vote_count,
    release_date,
    overview,
  } = movie;

  const movieDetails = document.createElement("div");
  movieDetails.classList.add("container");
  movieDetails.innerHTML = `
    <!-- Your HTML template for displaying movie details goes here -->
    <div class="imgclass">
    <div class="up-content">
    <div class="img1">
        <img src="${imageURL + poster_path}" alt="${title}" />
    </div>
    <div class="content">
        <div class="name">
            ${title}
        </div>
        <div class="star">
            <i class="fa fa-star checked" style="font-size:24px"></i> ${vote_average}/10
        </div>

        <div class="lang">

            Tamil, Telugu, Hindi, Kannada
        </div>
        <div class="bio">
            2h 45m Action, Thriller
        </div>
        <div class="bookticket">
            <a href="/paymentform"><button class="btn">Book Tickets</button></a>
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
