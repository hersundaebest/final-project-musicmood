const express = require('express');
const spotifyWebAPI = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8000;

const {
    getRecentlyPlayedSongs,
    getAudioFeatures,
    handleLogin
  } = require("./handlers");

// test
express()
.use(cors())
.use(bodyParser.json())
.use(express.urlencoded({extended: false}))

.get("/", (req, res) => {
    res.send('Hello World');
})


  // Spotify Endpoints
  .post('/login', handleLogin)
  .get('/me/player/recently-played', getRecentlyPlayedSongs)
  .get('/audio-features', getAudioFeatures)


.listen(PORT, () => console.info(`Listening on port ${PORT}`));
