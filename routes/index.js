var express = require("express");
var router = express.Router();
//
const userModel = require("./users");
// const Booking = require('./paymentmodel');
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
//

//
/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/new", function (req, res) {
  res.render("newpopular");
});
router.get("/home", function (req, res) {
  res.render("home");
});
router.get("/tvshow", function (req, res) {
  res.render("tvshow");
});
router.get("/nowplaying", function (req, res) {
  res.render("nowplaying");
});
router.get("/rating", function (req, res) {
  res.render("rating");
});
router.get("/termsofuse", function (req, res) {
  res.render("termsofuse");
});
router.get("/razorpay", function (req, res) {
  res.render("razorpay");
});
router.get("/privacy", function (req, res) {
  res.render("privacy");
});
// router.get("/contact", function (req, res) {
//   res.render("contact");
// });

router.get("/toprated", function (req, res) {
  const selectedDivId = req.session.selectedDivId || "No div selected";
  res.render("toprated", { selectedDivId });
});

router.get("/seats", function (req, res) {
  const selectedDivId = req.session.selectedDivId || "No div selected";
  res.render("seats", { selectedDivId });
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
  res.render("profile", { user });
});
router.get("/paymentsummary", isLoggedInforBook, function (req, res) {
  const seats = req.query.seats;
  const total = req.query.total;
  const title = req.query.title;
  res.render("paymentsummary", { seats, total, title });
});
router.get("/paymentform", async function (req, res) {
  try {
    const seats = req.query.seats;
    res.render("paymentform", { seats });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/home/:id", (req, res) => {
  const divId = req.params.id;
  req.session.selectedDivId = divId;
  res.send("Div selected and ID stored in session.");
});

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
function isLoggedInforBook(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
// router.post("/book-seats", isLoggedIn, async function (req, res) {
//   try {
//     const { movieId, seats, totalPrice } = req.body;

//     const userId = req.user._id;
//     const booking = { movieId, seats, totalPrice };

//     await userModel.findByIdAndUpdate(userId, {
//       $push: { bookings: booking },
//     });

//     res.redirect("/paymentsummary?seats=" + seats + "&total=" + totalPrice + "&title=" + movieId.title);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// router.get("/paymentform", isLoggedIn, async function (req, res) {
//   try {
//     // Fetch data needed for the payment form
//     // This can include details about the movie, selected seats, etc.
//     const movieId = req.query.title;  // Assuming title is the movie ID

//     // Render your payment form page or perform other actions with the data
//     res.render('paymentform', { movieId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;
