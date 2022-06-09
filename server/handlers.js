"use strict";

const { MongoClient } = require("mongodb");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
// const moodAnalysis = require("./utils")
const { MONGO_URI, DATABASE_NAME, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const credentials = {clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: REDIRECT_URI}
const spotifyAPI = new SpotifyWebApi(credentials);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// yarn add uuid
const { v4: uuidv4 } = require("uuid");

const sendMessage = (res, status, data, message = "") => {
    return res
      .status(status)
      .json({ status: status, data: data, message: message });
  };

// handleLogin
const handleLogin = async (req, res) => {
    try {
const code = req.body.code;
const token = await spotifyAPI.authorizationCodeGrant(code);
console.log('token', token);
res.json({accessToken: token.body.access_token});
    } catch (err) {
        console.log(err.message);
    }
};

// Get recently played songs
  const getRecentlyPlayedSongs = async (req, res) => {
    const {token} = req.query;
    spotifyAPI.setAccessToken(token);
    spotifyAPI.getMyRecentlyPlayedTracks({
        limit : 25
      }).then((data) => {
          // Output items
        const songsArray = data.body.items.map((song) => song.track.id);
        spotifyAPI.getAudioFeaturesForTracks(songsArray)
        .then((data) => {
            console.log(data.body);
        //    const mood = moodAnalysis(data.body);
        //  res.status(200).json({audioFeatures: data.body, mood: mood})});
         res.status(200).json({audioFeatures: data.body})});
         console.log(data.body);

        }, (err) => {
          console.log('Something went wrong!', err);
        });
    }

// Get audio features of songs

  const getAudioFeatures = async (req, res) => {
//     const credentials = {clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: REDIRECT_URI}
//     try {
//         const spotifyAPI = new SpotifyWebApi(credentials);
//         const code = req.body.code;
//         const token = await spotifyAPI.authorizationCodeGrant(code);
//         console.log('token', token);
//         res.json({accessToken: token.body.access_token});
//             } catch (err) {
//                 console.log(err.message);
//             }
        };

module.exports={handleLogin, getRecentlyPlayedSongs, getAudioFeatures};