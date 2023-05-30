import "./index.css";
import styled from "styled-components";

const LayoutBar = styled.main`
  position: fixed;
  width: 100%;
  height: 72px;
  left: 0px;
  top: 0px;
  background: #151515;
`;

const Layout = ({ children }) => {
  return <LayoutBar>{children}</LayoutBar>;
};



export default Layout;
