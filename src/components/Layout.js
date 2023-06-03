import { Outlet } from "react-router-dom";
import { Content } from "../styles/HeaderBarStyle.js";
import { ResponsiveContainer, ContentContainer } from "../styles/LayoutStyle.js";
import Trending from "./feed/Trending.js";
import Header from "./header/Header.js";

const Layout = () => {
  return (
    <Content>
      <Header />
      <ResponsiveContainer>
        <ContentContainer>
          <Outlet />
          <Trending />
        </ContentContainer>
      </ResponsiveContainer>
    </Content>
  );
};

export default Layout;
