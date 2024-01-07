var express = require("express");
var router = express.Router();
//
const userModel = require("./users");
const Booking = require('./paymentmodel');
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
//
//THIS IS MY API ------------ Abhianv KEY
// const APIKEY = "api_key=0e7fb9630b7a8648f2250631b68d391d";
// const baseURL = "https://api.themoviedb.org/3";
// const upcomingURL = baseURL + "/movie/upcoming?language=en-US&page=1&" + APIKEY;

// getMovieIndices(upcomingURL)
//   .then((indicesArray) => {
//     console.log(indicesArray);
 
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });

// function getMovieIndices(url) {
//   return fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
    
//       return Array.from({ length: data.results.length }, (_, index) => index);
//     })
//     .catch((error) => {
//       console.error("Error fetching movies:", error);
//       throw error; 
//     });
// }


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
// router.get("/toprated/:id", function (req, res) {
//   const thatId = req.params.id;
//   console.log(`Received request for movie ID: ${thatId}`);
//   req.session.thatDivId = thatId;
//   res.json({ message: 'Movie ID stored in session.' });
// });

router.get("/toprated", function (req, res) {
  
  // console.log('Div selected and ID stored in session.');
  const selectedDivId = req.session.selectedDivId || 'No div selected';
  res.render("toprated",{ selectedDivId });
});

router.get("/seats",function (req,res){
  const selectedDivId = req.session.selectedDivId || 'No div selected';
  res.render("seats",{ selectedDivId });
})
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
router.get("/paymentform", isLoggedInforBook, async function (req, res) {
  try {

    res.render("paymentform",{});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/home/:id', (req, res) => {
  const divId = req.params.id;
  req.session.selectedDivId = divId;
  res.send('Div selected and ID stored in session.');
});
// router.get('/', (req, res) => {
//   res.render("book");
// });

// Route to retrieve the selected div's ID from session
// router.get('/retrieveDiv', (req, res) => {
//   res.render('retrieveDiv');
// });

router.get("/payment-success", function (req, res) {
  res.render("paymentdone");
});

router.get("/popular", function (req, res) {
  res.render("populardetails");
});




// REGISTERING USER AND LOGIN ---------------------
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
// For Booking!
function isLoggedInforBook (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}




module.exports = router;
