// routes/payment.js

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key');

router.get('/checkout', (req, res) => {
  // Fetch movie details and other necessary information
  const movieDetails = fetchMovieDetailsFromDatabase(); // Implement this function

  res.render('payment/checkout', { movieDetails });
});

router.post('/checkout', async (req, res) => {
  const { movieId, seats, totalPrice } = req.body;

  // Create a payment intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100, // convert to cents
    currency: 'usd', // change as per your requirements
  });

  res.render('payment/payment', { clientSecret: paymentIntent.client_secret });
});

router.post('/confirm', (req, res) => {
  // Update the user's profile with the booked movie details
  const userId = req.user._id;
  const { movieId, seats, totalPrice } = req.body;

  // Save booking details in the user's profile using Mongoose
  // Update the user's profile model accordingly
  // You may need to create a new model for bookings
  User.findByIdAndUpdate(userId, {
    $push: { bookings: { movieId, seats, totalPrice } },
  }, { new: true }, (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('payment/confirm', { movieId, seats, totalPrice });
    }
  });
});

module.exports = router;
