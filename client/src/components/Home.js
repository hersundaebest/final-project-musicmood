import styled from "styled-components";
import Mood from "./Mood";
import Footer from "./Footer"
import { loginURL } from "../spotify";

const Home = () => {
    return (
        <>
        <Wrapper>
        <Header>MUSICMOOD</Header>
        <Subheader>Find your #currentmood through your music</Subheader>
        <LoginButton><MoodLink href={loginURL}>LOGIN WITH SPOTIFY</MoodLink></LoginButton>
        </Wrapper>
        <Footer/>
        </>
    )
}

const Wrapper = styled.div`
margin: auto;
text-align: center;
`;

const Header = styled.h1`
font-family: 'Poppins';
font-size: 100px;
font-weight: 800;
color: var(--primary-color);
letter-spacing: 10px;
animation-name: wavy;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  position: relative;
  top: 0;
  left: 0;
-webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--primary-color);
  
@keyframes wavy {
  0% {
    top: 0px;
  }
  50% {
    top: -4px;
  }
  75% {
    top: -4px;
  }
  100% {
    top: 0px;
  }
}


  
`

const Subheader = styled.h2`
font-family: 'Poppins';
font-size: 22px;
font-weight: 400;
color: var(--secondary-color);
margin-top: -15px;
margin-bottom: 10px;
`

const LoginButton = styled.button`
margin-top: 10px;
padding: 20px 30px;
font-family: 'Poppins';
font-size: 20px;
font-weight: 600;
background-color: rgba(240, 235, 244, 0.7);
color: black;
mix-blend-mode: screen;
border-radius: 20px;
`

const MoodLink = styled.a`
text-decoration: none;
`;

export default Home;