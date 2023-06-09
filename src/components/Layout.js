import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Content } from "../styles/HeaderBarStyle.js";
import { ResponsiveContainer, ContentContainer } from "../styles/LayoutStyle.js";
import Trending from "./feed/Trending.js";
import Header from "./header/Header.js";

const Layout = () => {
  const [newRequest, setNewRequest] = useState(false);
  return (
    <Content>
      <Header />
      <ResponsiveContainer>
        <ContentContainer>
          <Outlet setNewRequest={setNewRequest} />
          <Trending />
        </ContentContainer>
      </ResponsiveContainer>
    </Content>
  );
};

export default Layout;
