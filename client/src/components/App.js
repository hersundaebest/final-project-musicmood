import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Mood from "./Mood";

const App = () => {
  return (
    <AppWrapper>
      <GlobalStyles />
      <BrowserRouter>
        <ComponentWrapper>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/mood" element={<Mood />} />
          </Routes>
        </ComponentWrapper>
      </BrowserRouter>    
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
