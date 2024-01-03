// routes/firstRoute.js
const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.redirect(`/second-route/${id}`);
});

module.exports = router;
