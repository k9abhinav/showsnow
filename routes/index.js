var express = require("express");
var router = express.Router();
//
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
//

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/home", function (req, res) {
  res.render("home");
});
router.get("/sports", function (req, res) {
  res.render("sports");
});
router.get("/shows", function (req, res) {
  res.render("shows");
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
router.get("/payment-success", function (req, res) {
  res.render("paymentdone");
});
router.get("/details", function (req, res) {
  res.render("details");
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
