import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContent = styled.main`
  width: 100vw;
  min-height: 100vh;
`;

const HeaderBar = styled.div`
  height: 72px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    a {
      font-family: "Passion One";
      font-size: 49.976px;
      font-weight: 700;
      color: #fff;
      margin-right: 30px;
    }
    img {
      width: 53px;
      height: 53px;
      border-radius: 26.5px;
      margin-left: 30px;
    }
  }
  .dropDown {
    width: 20px;
    height: 20px;
  }
`;

const Layout = () => {
  return (
    <LayoutContent>
      <HeaderBar>
        <HeaderContent>
          <div>
            <a href="/">linkr</a>
          </div>
          <div>
            <img className="dropDown" src="/drop down icon.svg" alt="drop" />
            <img src="/profile.jpg" alt="profile" />
          </div>
        </HeaderContent>
      </HeaderBar>
      <ResponsiveContainer>
        <Outlet />
        <Sidebar />
      </ResponsiveContainer>
    </LayoutContent>
  );
};

const ResponsiveContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  border: 1px solid red;
  margin-top: 53px;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 611px;
    margin: 0 auto;
  }

  @media (min-width: 920px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  width: 301px;
  display: none;
  height: 100vh;
  border: 1px solid yellowgreen;

  @media (min-width: 920px) {
    display: block;
  }
`;

export default Layout;
