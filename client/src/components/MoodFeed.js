import styled from "styled-components";
import moment from "moment";

const MoodFeed = ({ feedMoods }) => {

  const slicedMoodsArr = feedMoods.slice(-3);
  console.log(slicedMoodsArr);
  return (
    <>
      <Header>MUSICMOODS</Header>
      <SizeDiv>
        <Wrapper>
          <Feed>
            {slicedMoodsArr?.map((el) => (
              <>
                <p>
                  On {moment(el.timestamp).format("MMMM D, YYYY [at] h:mm A")},
                  you were feeling <Bold>{el.mood}.</Bold>
                </p>
                <Divider />
              </>
            ))}
          </Feed>
        </Wrapper>
      </SizeDiv>
    </>
  );
};

const Bold = styled.span`
  font-weight: bold;
`;

const Header = styled.div`
  font-family: "Poppins";
  margin-left: auto;
  margin-right: auto;
  font-size: 55px;
  font-weight: 800;
  text-align: center;
  color: var(--primary-color);
  letter-spacing: 10px;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2.5px;
  -webkit-text-stroke-color: var(--primary-color);
`;

const SizeDiv = styled.div`
  width: 620px;
  margin: auto;
  padding-bottom: 20px;
  padding-top: 10px;
`;
const Wrapper = styled.div`
  background-color: rgba(240, 235, 244, 0.7);
  margin-top: 5px;
  padding: 30px 20px 20px 20px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Feed = styled.div`
  color: var(--secondary-color);
  margin: auto;
`;

const Divider = styled.hr`
  color: var(--secondary-color);
  background-color: var(--secondary-color);
  height: 1px;
  width: 300px;
  border: 1px transparent;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export default MoodFeed;
