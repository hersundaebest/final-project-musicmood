import styled from "styled-components";
import MoodHeader from "./MoodHeader";
import MoodAnalysis from "./MoodAnalysis";
import MoodFeed from "./MoodFeed";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

const Result = () => {
  const { userMood, userEmail, setFeedMoods, feedMoods } = useContext(GlobalContext);

  useEffect(() => {
if (userMood) {

    fetch("/api/add-mood", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: userMood, email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        fetch(`/api/get-mood?email=${userEmail}`)
          .then((res) => res.json())
          .then((data) => {
              console.log("patch data", data.data.moods)
            setFeedMoods(data.data.moods);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }}, [userMood]);


// useeffect - empty d.a. !feedMoods useNavigate /home

  return (
    <>
      <MoodHeader />
      <Wrapper>
        <Div1>
          <MoodAnalysis />
        </Div1>
        <Div1>
          <MoodFeed />
        </Div1>
      </Wrapper>
    </>
  );
};

const Div1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export default Result;
