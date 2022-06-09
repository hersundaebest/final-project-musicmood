import styled from "styled-components";

const MoodFeed = ({userData}) => {
    return (
        <>
        <Header>MY MUSICMOODS</Header>
        <Wrapper>   
            <Feed>
        <p>On [DATE] at [TIME], you were feeling [MOOD].</p>
        <Divider/>
        <p>On [DATE] at [TIME], you were feeling [MOOD].</p>
        </Feed>
        </Wrapper>
        </>
    )
}

const Header = styled.div`
font-family: 'Poppins';
font-size: 60px;
font-weight: 800;
color: var(--primary-color);
letter-spacing: 10px;
-webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--primary-color);
`;

const Wrapper = styled.div`
background-color: rgba(240, 235, 244, 0.7);
margin-top: 5px;
padding: 20px 20px;
border-radius: 20px;
text-align: center;
`;

const Feed = styled.div`
color: var(--secondary-color);
`;

const Divider = styled.hr`
  color: var(--secondary-color);
  background-color: var(--secondary-color);
  /* mix-blend-mode: screen; */
  height: 1px;
  width: 300px;
  border: 1px transparent;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export default MoodFeed;