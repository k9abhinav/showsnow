var express = require('express');
var router = express.Router();
//
const userModel =require("./users");
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
//

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/home', function(req, res) {
  res.render('home');
});
router.get('/lisha', function(req, res) {
  res.render('lisha');
});
router.get('/signin', function(req, res) {
  res.render('signin');
});
router.get('/signup', function(req, res) {
  res.render('signup');
});
router.get('/profile', isLoggedIn,function(req, res) {
  res.render('profile')
});
router.get('/payments', function(req, res) {
  res.render('paymentdone');
});
router.get('/details', function(req, res) {
  res.render('details');
});
// REGISTERING USER
router.post('/register', function(req,res){
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  })
  userModel.register(userdata,req.body.password)
    .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    })
  })
})
// LOGIN USER
router.post("/login",passport.authenticate("local",{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})
// LOGOUT 
router.get('/logout', function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  })
})
// is LOggedIN middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}





module.exports = router;
