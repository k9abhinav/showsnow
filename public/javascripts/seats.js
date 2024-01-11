
// 


const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";
const popularURL =baseURL+"/movie/popular?language=en-US&page=1&"+APIKEY;


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
      // console.log(data);
    });
}
const name_movie=document.querySelector(".displayname")
function showDetails(movie) {
  const { title } = movie;
  name_movie.textContent = `Booking Tickets for : ${title}`;

  // Store 'title' in session
  setSessionData("movieTitle", title);
}


const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

// Note: localStorage is not enabled in CodePen for security reasons.
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add("selected");
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// function updateSelectedCount() {
//   const selectedSeats = document.querySelectorAll(".row .seat.selected");
//   // const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
//   // localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
//   const selectedSeatsCount = selectedSeats.length;
//   count.innerText = selectedSeatsCount;
//   total.innerText = selectedSeatsCount * ticketPrice * 15;
// }
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  const totalPrice = selectedSeatsCount * ticketPrice * 15;
  const movieTitle = getSessionData("movieTitle"); // Retrieve 'title' from session

  count.innerText = selectedSeatsCount;
  total.innerText = totalPrice;

  // Store data in session
  setSessionData("selectedSeatsCount", selectedSeatsCount);
  setSessionData("totalPrice", totalPrice);
  setSessionData("movieTitle", movieTitle); // Save 'title' to session
}



movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  // setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Init
// populateUI();
// updateSelectedCount();

function setSessionData(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionData(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function redirect() {
  // Retrieve data from session
  const selectedSeatsCount = getSessionData("selectedSeatsCount");
  const totalPrice = getSessionData("totalPrice");
  const movieTitle = getSessionData("movieTitle");

  // Redirect to the next route with the data
  window.location.href = `/paymentsummary?seats=${selectedSeatsCount}&total=${totalPrice}&title=${encodeURIComponent(movieTitle)}`;
}


