import styled from "styled-components";
import MoodFeed from "./MoodFeed";
import MoodAnalysis from "./MoodAnalysis";
import Loading from "./Loading";
import MoodHeader from "./MoodHeader";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";

const Mood = () => {
  const [userData, setUserData] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [userMood, setUserMood] = useState();
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedMoods, setFeedMoods] = useState();
  const [items, setItems] = useState();

  const userEmail = userData?.body.email;

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
        .then((data) => {
          fetch(`/api/get-mood?email=${data.email}`)
            .then((res) => res.json())
            .then((data) => {
              setFeedMoods(data.data.moods);
            });
        });
    }
  }, [accessToken]);

  // posting the user to MongoDB
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

  // setting state values through find your mood button
  const onClickHandler = async () => {
    await fetch(`/me/player/recently-played?token=${accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setRecentlyPlayed(data.audioFeatures);
        setClicked(true);
        setUserMood(data.mood);
        setItems(data.items);
      })
      .then(console.log("Mood recorded"))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetch("/api/add-mood", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: userMood, email: userEmail }),
    })
      .then(console.log("Mood recorded"))

      .catch((err) => {
        console.log(err.message);
      });
  }, [userMood]);

  // const addMoodHandler = async () => {
  //   await fetch('/api/add-mood', {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ mood: userMood, email: userEmail }),
  //   })
  //     .then(console.log("Mood recorded"))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // variables to display data
  const userName = userData?.body.display_name;
  const profileImg = userData?.body.images[0].url;
  const profileURL = userData?.body.external_urls.spotify;

  const onMouseEnterHandler = (e) => {
    e.target.style.transform = "scale(1.05)";
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.transform = "scale(1)";
  };

  if (status === "loading") {
    return (
      <LoadingDiv>
        <Loading />
      </LoadingDiv>
    );
  }

  return (
    <>
      {clicked === false ? (
        <>
          <MoodHeader userData={userData} />
          <MainWrapper>
            <WelcomeMessage>
              Howdy, <b>{userName}</b>!
            </WelcomeMessage>
            <A
              href={profileURL}
              target="_blank"
              onMouseOver={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            >
              <ProfileImg src={profileImg} />
            </A>
            <MoodButton onClick={onClickHandler}>FIND YOUR MOOD</MoodButton>
          </MainWrapper>
        </>
      ) : (
        <>
          <MoodHeader userData={userData} />
          <Wrapper>
            <Div1>
              <MoodAnalysis
                userData={userData}
                recentlyPlayed={recentlyPlayed}
                accessToken={accessToken}
                userMood={userMood}
                items={items}
              />
            </Div1>
            <Div1>
              {/* button to record mood - deal with this */}
              {/* <ButtonDiv>
            <RecordButton type="submit" onClick={addMoodHandler}>RECORD YOUR MOOD</RecordButton>
            </ButtonDiv> */}
              <MoodFeed userData={userData} feedMoods={feedMoods} />
            </Div1>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Div1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const LoadingDiv = styled.div`
  margin: auto;
  padding-top: 40px;
`;

const WelcomeMessage = styled.div`
  font-size: 20px;
`;

const ProfileImg = styled.img`
  width: 300px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const A = styled.a`
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
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

const RecordButton = styled.button`
  margin-bottom: 20px;
  padding: 20px 30px;
  max-width: 400px;
  font-family: "Poppins";
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(240, 235, 244, 0.7);
  color: black;
  mix-blend-mode: screen;
  border-radius: 20px;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  margin-top: 55px;
  /* margin-bottom: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Mood;
