import styled from "styled-components";

const MoodAnalysis = ({ userData }) => {
  const userName = userData?.body.display_name;

  return (
    <>
      <Wrapper>
        <Div>Based on your recently played songs, you're feeling <b>[MOOD]</b>!</Div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const Div = styled.div`
  padding-bottom: 5px;
  margin-top: 30px;
  margin: auto;
  align-items: center;
`;

export default MoodAnalysis;
