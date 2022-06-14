import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // state declarations
  const [userData, setUserData] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [userMood, setUserMood] = useState();
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedMoods, setFeedMoods] = useState();
  const [items, setItems] = useState();

  // obtaining access token from spotify api
  const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);
  const sessionToken = sessionStorage.getItem("accessToken");

  // obtaining the user data from Spotify via the session and access tokens
  useEffect(() => {
    if (!accessToken && !sessionToken) {
      return;
    }
    if (sessionToken) {
      setStatus("loading");
      spotifyAPI.setAccessToken(JSON.parse(sessionToken));
      spotifyAPI
        .getMe()
        .then((data) => {
          setUserData(data);
          setStatus("loaded");
          return data.body;
        })
        // .then((data) => {
        //   fetch(`/api/get-mood?email=${data.email}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //       setFeedMoods(data.data.moods);
        //     });
        // });
    }
  }, [accessToken]);

  // posting the user to MongoDB
  const userEmail = userData?.body.email;

  useEffect(() => {
    if (userData) {
      fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userData]);

  // variables to display data
  const userName = userData?.body.display_name;
  const profileImg = userData?.body.images[0].url;
  const profileURL = userData?.body.external_urls.spotify;

  return (
    <GlobalContext.Provider
      value={{
        userData,
        userEmail,
        recentlyPlayed,
        userMood,
        clicked,
        status,
        feedMoods,
        items,
        accessToken,
        userName,
        profileImg,
        profileURL,
        setRecentlyPlayed,
        setClicked,
        setUserMood,
        setItems,
        setFeedMoods

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
