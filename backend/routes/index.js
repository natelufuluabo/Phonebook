var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');


router.get("/info", async function(req, res, next) {
  const currentTime = new Date();
  try {
    const response = await fetch("http://localhost:3000/api/persons");
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.send(`<p>Phone book has info for ${data.length} ${data.length > 1 ? "person" : "people"}</p> <br/> <p>${currentTime}</p>`)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
