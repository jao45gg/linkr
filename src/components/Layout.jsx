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
            <a href="/"> linkr </a>
          </div>
          <div>
            <img className="dropDown" src="/drop down icon.svg" alt="drop" />
            <img src="/profile.jpg" alt="profile" />
          </div>
        </HeaderContent>
      </HeaderBar>
      <Outlet />
    </LayoutContent>
  );
};

export default Layout;
