import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <LayoutBar>
      <Outlet />
    </LayoutBar>
  );
};

const LayoutBar = styled.main`
  position: fixed;
  width: 100%;
  height: 72px;
  left: 0px;
  top: 0px;
  background: #151515;
`;
export default Layout;
