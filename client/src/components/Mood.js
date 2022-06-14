import styled from "styled-components";
import Loading from "./Loading";
import MoodHeader from "./MoodHeader";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";

const Mood = () => {
  const {
    userData,
    status,
    accessToken,
    userName,
    profileImg,
    profileURL,
    setRecentlyPlayed,
    setClicked,
    setUserMood,
    setItems,
  } = useContext(GlobalContext);

  let navigate = useNavigate();

  // setting state values through find your mood button
  useEffect(() => {
    fetch(`/me/player/recently-played?token=${accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setRecentlyPlayed(data.audioFeatures);
        setClicked(true);
        setUserMood(data.mood);
        setItems(data.items);
      })
      .then(console.log("Mood recorded"))
      .catch((err) => {
        console.log(err.message);
      });
  }, [accessToken]);

  // Mouse and click handlers
  const onMouseEnterHandler = (e) => {
    e.target.style.transform = "scale(1.05)";
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const onClickHandler = () => {
    navigate("/result");
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
  );
};

const LoadingDiv = styled.div`
  margin: auto;
  padding-top: 40px;
`;

const WelcomeMessage = styled.div`
  font-size: 20px;
`;

const ProfileImg = styled.img`
  width: 280px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const A = styled.a`
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
export default Mood;
