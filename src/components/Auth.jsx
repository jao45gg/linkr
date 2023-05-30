import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Auth = () => {
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
    height: 100dvh;
`;

const Left = styled.section`
  width: calc(100vw - 535px);
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  position: relative;

  span {
    position: absolute;
    top: 29.39%;
    left: 15.91%;
  }
  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
  p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;

const Right = styled.section`
  position: relative;
  width: 535px;

  span {
    position: absolute;
    top: 30.96%;
    left: 9.53%;
  }
`;
export default Auth;
