const express = require("express");
const spotifyWebAPI = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8000;

const {
  getRecentlyPlayedSongs,
  addUser,
  getMood,
  addMood,
  handleLogin,
} = require("./handlers");

// test
express()
  .use(cors())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get("/", (req, res) => {
    res.send("Hello World");
  })

  // Spotify Endpoints
  .post("/login", handleLogin)
  .get("/me/player/recently-played", getRecentlyPlayedSongs)
  .post("/api/add-user", addUser)
  .get("/api/get-mood", getMood)
  .post("/api/get-mood", getMood)
  .patch("/api/add-mood", addMood)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
