import styled from "styled-components";
import MoodFeed from "./MoodFeed";
import MoodAnalysis from "./MoodAnalysis";
import Loading from "./Loading";
import MoodHeader from "./MoodHeader";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";

const Mood = () => {
  const [userData, setUserData] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [clicked, setClicked] = useState(false);

  const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);
  const sessionToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken && !sessionToken) {
      return;
    }
    if (sessionToken) {
      spotifyAPI.setAccessToken(JSON.parse(sessionToken));
      spotifyAPI.getMe().then((data) => {
        console.log("*****", data);
        setUserData(data);
      });
    }
  }, [accessToken]);

  const onClickHandler = () => {
    fetch(`/me/player/recently-played?token=${accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setRecentlyPlayed(data.audioFeatures);
        setClicked(true);
        console.log(data.audioFeatures);
      })
      .catch((err) => console.log(err.message));
  };

  // variables to display data
const userName = userData?.body.display_name;
const profileImg = userData?.body.images[0].url;
const profileURL = userData?.body.external_urls.spotify;


// arrays and averages calculations 
const danceabilityArr = recentlyPlayed?.audio_features.map((song) => song.danceability);
const energyArr = recentlyPlayed?.audio_features.map((song) => song.energy);
const valenceArr = recentlyPlayed?.audio_features.map((song) => song.valence);

console.log("danceability", danceabilityArr);
console.log("energy", energyArr);
console.log("valence", valenceArr);

return (
  <>
{clicked === false ? (
  <>
      <MoodHeader />
      <MainWrapper>
      <WelcomeMessage>Howdy, <b>{userName}</b>!</WelcomeMessage>
      <A href={profileURL} target="_blank"><ProfileImg src={profileImg} /></A>
      <MoodButton onClick={onClickHandler}>FIND YOUR MOOD</MoodButton>
      </MainWrapper>
      </>
      ) : 
      <>
      <MoodHeader />
      <Wrapper>
      <MoodAnalysis userData={userData} />
      <MoodFeed userData={userData} />
    </Wrapper>
    </>}
    </>
)
  // return (
  //   <>
  //     <MoodHeader />
  //     <MainWrapper>
  //     <WelcomeMessage>Howdy, <b>{userName}</b>!</WelcomeMessage>
  //     <A href={profileURL} target="_blank"><ProfileImg src={profileImg} /></A>
  //     <MoodButton onClick={onClickHandler}>FIND YOUR MOOD</MoodButton>
  //     </MainWrapper>
  //     {clicked === true ? (
  //     ) : ""}
  //   </>
  // );
};

const WelcomeMessage = styled.div`
margin: auto;
margin-top: 50px;
font-size: 20px;
`;

const ProfileImg = styled.img`
  width: 250px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const A = styled.a`
margin: auto;`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoodButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 30px;
  max-width: 400px;
  margin: auto;
  font-family: "Poppins";
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(240, 235, 244, 0.7);
  color: black;
  mix-blend-mode: screen;
  border-radius: 20px;
  cursor: pointer;
`;

export default Mood;
