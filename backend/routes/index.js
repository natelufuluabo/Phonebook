/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>Welcome to PhoneBook API</h1>');
});

module.exports = router;
