import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MoodHeader = () => {
  return (
    <>
      <Wrapper>
        <HomeButton>
          <HomeLink to="/">RESTART</HomeLink>
        </HomeButton>
        <Header>MUSICMOOD</Header>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
`;

const HomeButton = styled.button`
  padding: 10px 20px;
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 800;
  background-color: rgba(240, 235, 244, 0.7);
  color: black;
  mix-blend-mode: screen;
  border-radius: 10px;
`;

const HomeLink = styled(NavLink)`
  text-decoration: none;
`;

const Header = styled.h1`
  font-family: "Poppins";
  font-size: 30px;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: 5px;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--primary-color);
`;

export default MoodHeader;
