import styled from "styled-components";
import { useState, useEffect } from "react";

const MoodAnalysis = ({ userData, albumArtURL, accessToken, userMood, trackURL }) => {
  const userName = userData?.body.display_name;
  const [danceScore, setDanceScore] = useState("");
  const [energyScore, setEnergyScore] = useState("");
  const [positivityScore, setPositivityScore] = useState("");

  // getting user mood from backend data
  useEffect(() => {
    fetch(`/me/player/recently-played?token=${accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        setEnergyScore(data.energy.toFixed(0));
        setDanceScore(data.danceability.toFixed(0));
        setPositivityScore(data.valence.toFixed(0));
      })
      .catch((err) => console.log(err.message));
  }, []);

 const songURI = trackURL?.map((track) => track);

  return (
    <>
      <Wrapper1>
        <AlbumArtGrid>
          {albumArtURL?.map((url) => (
            <a href={songURI} target="_blank">
            <AlbumArtImg src={url}/>
            </a>
          ))}
        </AlbumArtGrid>
      </Wrapper1>


      <Wrapper2>
        <Div>
          <Bold>{userName}</Bold>, based on your recently played songs,
        </Div>
        <Div>
          you're feeling <Bold>{userMood}</Bold>.
        </Div>
        <RowDiv>
          <ScoreDiv>
            <Div2>{danceScore}%</Div2> DANCEABLE
          </ScoreDiv>
          <ScoreDiv>
            <Div2>{energyScore}% </Div2>ENERGETIC
          </ScoreDiv>
          <ScoreDiv>
            <Div2>{positivityScore}%</Div2>POSITIVE
          </ScoreDiv>
        </RowDiv>
      </Wrapper2>
    </>
  );
};

const ScoreDiv = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  font-size: 24px;
  letter-spacing: 2px;
  font-weight: 800;
  line-height: 40px;
  padding: 25px 25px 25px 25px;
  background-color: rgba(240, 235, 244, 0.7);
  color: black;
  mix-blend-mode: screen;
  border-radius: 50%;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 30px;
`;
const Bold = styled.span`
  font-weight: bold;
`;

const AlbumArtGrid = styled.div`
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 5px;
  align-items: stretch;
  justify-items: center;
`;

const AlbumArtImg = styled.img`
  width: 80px;
  height: 8-px;
`;

const Wrapper1 = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper2 = styled.div`
  padding-bottom: 20px;
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const Div = styled.div`
  padding-bottom: 5px;
  margin-top: 100px;
  margin: auto;
  text-align: center;
  font-size: 18px;
`;

const Div2 = styled.div`
  padding-bottom: 5px;
  padding-top: 15px;
  text-align: center;
  font-family: "Poppins";
  font-size: 60px;
  font-weight: 800;
  color: black;
  letter-spacing: 5px;
`;

export default MoodAnalysis;
