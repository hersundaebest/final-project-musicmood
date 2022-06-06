import Home from "./Home"
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <AppWrapper>
    <GlobalStyles />
    <BrowserRouter>
      <Header />
      <ComponentWrapper>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ComponentWrapper>
    </BrowserRouter>
  </AppWrapper>
  );
}

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
