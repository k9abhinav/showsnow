var express = require("express");
var router = express.Router();
//
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
//
//THIS IS MY API ------------ Abhianv KEY
const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
const baseURL = "https://api.themoviedb.org/3";
const APIURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + APIKEY;
const imageURL = "https://image.tmdb.org/t/p/w500";
const searchURL = baseURL + "/search/movie?" + APIKEY;
const trendingURL = baseURL+"/trending/all/day?language=en-US&"+APIKEY;
const upcomingURL = baseURL + "/movie/upcoming?language=en-US&page=1&" + APIKEY;

const gotindex = getMovieIndices(upcomingURL)
  .then((indicesArray) => {
    // Now 'indicesArray' contains an array of indices
    console.log(indicesArray);
    // You can use these indices to access specific elements in the 'results' array
    // For example: moviesArray[indicesArray[0]], moviesArray[indicesArray[1]], etc.
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });

function getMovieIndices(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      // Return an array of indices (e.g., [0, 1, 2, ...])
      return Array.from({ length: data.results.length }, (_, index) => index);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      throw error; // Rethrow the error to propagate it to the calling code
    });
}



//
/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/home", function (req, res) {
  res.render("home");
});
router.get("/people", function (req, res) {
  res.render("sports");
});
router.get("/contact", function (req, res) {
  res.render("contact");
});
router.get("/toprated", function (req, res) {
  res.render("toprated");
});
router.get("/login", function (req, res) {
  res.render("signin", { error: req.flash("error") });
});
router.get("/register", function (req, res) {
  res.render("signup");
});
router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  // console.log(oneuser);
  res.render("profile",{user});
});
router.post("/paymentsummary", function (req, res) {
  res.render("paymentsummary");
});
router.get("/paymentform", function (req, res) {
  res.render("paymentform");
});
router.get("/book", function (req,res){
  
  res.render("book")
});
router.get('/book/:id', function(req, res, next) {
  // Retrieve the movie ID from the request parameters
  var movieId = req.params.id;
  console.log("THIS MOVIE ID IS "+ movieId);
  // Render the book page with the movie ID
  res.render('book',{ movieId: movieId });
});

router.get("/payment-success", function (req, res) {
  res.render("paymentdone");
});
router.get("/popular", function (req, res) {
  res.render("populardetails");
});
// REGISTERING USER
router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
    fullname: req.body.fullname,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});
// LOGIN USER
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);
// LOGOUT
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
// is LOggedIN middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
