"use strict";

const { MongoClient } = require("mongodb");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
const {
  moodAnalysis,
  danceabilityScore,
  energyScore,
  valenceScore,
} = require("./utils");
const { MONGO_URI, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const credentials = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
};
const spotifyAPI = new SpotifyWebApi(credentials);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// handleLogin
const handleLogin = async (req, res) => {
  try {
    const code = req.body.code;
    const token = await spotifyAPI.authorizationCodeGrant(code);
    res.json({ accessToken: token.body.access_token });
  } catch (err) {
    console.log(err.message);
  }
};

// Get recently played songs and audio features for the tracks
const getRecentlyPlayedSongs = async (req, res) => {
  const { token } = req.query;
  spotifyAPI.setAccessToken(token);
  spotifyAPI.getMyRecentlyPlayedTracks({
      limit: 25,
    })
    .then(
      (info) => {
// get album art images from recently played songs data

// create a big array from info.body.items and get the individual items - return song.track
        const songsArray = info.body.items.map((song) => song.track.id);
        const songLinkArray = info.body.items.map((song) => song.track.uri);
        const imagesArray = info.body.items.map((song) => song.track.album.images);
        const albumArtImage = imagesArray.map((image) => image[0].url);
        const songLink = songLinkArray.map((link) => link)

// get audio features from recently played songs
        spotifyAPI.getAudioFeaturesForTracks(songsArray).then((data) => {
          const mood = moodAnalysis(data.body);
          const danceability = danceabilityScore(data.body);
          const energy = energyScore(data.body);
          const valence = valenceScore(data.body);
          console.log("mood", mood);
          res
            .status(200)
            .json({
              audioFeatures: data.body,
              mood: mood,
              danceability: danceability,
              energy: energy,
              valence: valence,
              album: albumArtImage,
              songLink: songLink
            });
        });
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
};

// add a user to MongoDB
const addUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("MusicMood");
    const verifyUser = await db
      .collection("Users")
      .findOne({ email: req.body.email });
    if (!verifyUser) {
      db.collection("Users").insertOne({
        email: req.body.email,
        moods: [],
      });
      res.status(200).json({ status: 200, verifyUser: verifyUser });
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const getMood = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("MusicMood");
    const result = await db
      .collection("Users")
      .findOne({ email: req.query.email }, {_id: 0, email: 0, moods: 1});
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, message: "No mood data found" });
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }

}

// adding a mood to user's mood array
const addMood = async (req, res) => {
  try {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("MusicMood");
  const result = await db
    .collection("Users")
    .updateOne({ email: req.body.email }, { $push: { moods: {mood: req.body.mood, timestamp: new Date()} } });
    result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, message: "No mood found" });
  client.close();
} catch (err) {
  console.log(err);
  res.status(500).json({ status: 500, message: "Internal server error" });
}
};

module.exports = {
  handleLogin,
  getRecentlyPlayedSongs,
  addUser,
  getMood,
  addMood,
};
