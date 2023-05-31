import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const LayoutMobile = () => {
  return (
    <Main>
      <Left>
        <span>
          <h1>linkr</h1>
          <p>
            save, share and discover <br /> the best links on the web
          </p>
        </span>
      </Left>
      <Right>
        <span>
          <Outlet />
        </span>
      </Right>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100dvh;
  width: 100dvw;
`;

const Left = styled.section`
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  height: 175px;
  width: 100%;

  span {
  }
  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 76px;
    line-height: 84px;
    letter-spacing: 0.05em;
    text-align: center;
    color: #ffffff;
  }
  p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 34px;
    text-align: center;
    color: #ffffff;
  }
`;

const Right = styled.section`
  margin: 40px 0;

  span {
  }
`;
export default LayoutMobile;
