// routes/secondRoute.js
const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.render('secondView', { id: id });
});

module.exports = router;
