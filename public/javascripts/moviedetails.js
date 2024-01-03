const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
// const APIURL = baseURL + "/movie/upcoming?language=en-US&page=1&" + APIKEY;
const imageURL = "https://image.tmdb.org/t/p/w500";
const searchURL = baseURL + "/search/movie?" + APIKEY;
const tvshowsURL = baseURL+"/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&"+APIKEY;
const topratedURL = baseURL+"/movie/top_rated?language=en-US&page=1&"+APIKEY;
const popularURL =baseURL+"/movie/popular?language=en-US&page=1&"+APIKEY;
const peopleURL = baseURL+"/trending/person/day?language=en-US&"+APIKEY;



// getMovieDetails(popularURL);
getMovieDetails(peopleURL);
function getMovieDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results)
      showMovies(data.results);
    });
}

const movielist = document.querySelector(".main-movie");

function showMovies(data) {
  movielist.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id, vote_count,overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
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
                <a href="/paymentform"><button class="know-more" id="${id}">Book Now</button</a>
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



















// const detailsmain = document.querySelector(".main-detail");

// function showDetails(datas) {
//   detailsmain.innerHTML = "";

//   datas.forEach((movies) => {
//     const {
//       title,
//       poster_path,
//       vote_average,
//       vote_count,
//       id,
//       release_date,
//       overview,
//     } = movies;
//     const movieDetails = document.createElement("div");
//     movieDetails.classList.add("container");
//     movieDetails.innerHTML = `
        
//     <div class="imgclass">
//     <div class="up-content">
//     <div class="img1">
//         <img src="${imageURL + poster_path}" alt="${title}" />
//     </div>
//     <div class="content">
//         <div class="name">
//             ${title}
//         </div>
//         <div class="star">
//             <i class="fa fa-star checked" style="font-size:24px"></i> ${vote_average}/10
//         </div>

//         <div class="lang">

//             Tamil, Telugu, Hindi, Kannada
//         </div>
//         <div class="bio">
//             2h 45m Action, Thriller
//         </div>
//         <div class="bookticket">
//             <a href="/paymentform"><button class="btn">Book Tickets</button></a>
//         </div>
//     </div>
// </div>

       
//     </div>
//     <div class="down-content">
//             <h2 class="heading2">
//                 Overview
//             </h2>

//             <p>
//                ${overview}
//             </p>

            
          
//         </div>

        
//         `;
//     // console.log(movieDetails.innerHTML)

//     detailsmain.appendChild(movieDetails);
//     movieDetails.addEventListener('click', function(){
//       var ID = console.log(`${id}`)
//     })
//   });
 
// }



{
  /* <img src="${ imageURL+poster_path }" alt="${title}">
        <div class="detail-info">
            <h1>${title}</h1>
            <h3>${vote_average}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
            <h3>${vote_count}k people liked it</h3>
        <p>${overview}</p>
        <span class="released">Released on ${release_date}</span>
        <br/>
        <a href="/paymentdone"><button class="booking">Book Tickets</button></a>
        </div> */
}
// Assuming you have a list of movie links

