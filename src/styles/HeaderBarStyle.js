import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";

export const Content = styled.main`
  width: 100vw;
  min-height: 100vh;
`;

export const HStyle = styled.div`
  height: 72px;
  width: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
  @media (max-width: 520px) {
    margin-bottom: 72px;
  }
`;

export const HContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
      margin-left: 1vw;
      cursor: pointer;
      background-size: cover;
      background-image: url(${(props) => props.picture});
      background-position: center center;
    }
  }

  .search {
    width: 100%;
    border-radius: 8px;
    height: 45px;
    border: none;
    padding-left: 17px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    z-index: 2;
  }
  .search input {
    width: 85%;
    height: 100%;
    border: none;
    background: none;
    outline: none;
    font-size: 19px;
    color: #c6c6c6;

  }
  .search svg {
    font-size: 24px;
    margin-right: 17px;
    color: #c6c6c6;
    cursor: pointer;
  }

  .input-menu {
    width: 100%;
    max-width: 563px;
    border-radius: 8px;
    max-height: 176px; 
    flex-direction: column;
    justify-content: space-between; 
    background-color: #e7e7e7;
    position: relative;
    :hover {
      .users {
        display: flex !important;
        position: absolute;
        z-index: 1;
        top: 30px;
        background-color: #e7e7e7;
        max-height: 150px; 
        padding-top:10px ;
        border-radius: 12px;
      }
    }
    .users {
      width: 100%;
      display: none;
      flex-direction: column;
      overflow-y: scroll;
    }
  }
  @media (max-width: 520px) {
    .input-menu {
      position: absolute;
      top: 75px;
    }
  }
`;

export const Drop = styled(AiOutlineDown)`
  z-index: 10;
  width: 20px;
  height: 20px;
  position: relative;
  color: #fff;
  cursor: pointer;
  rotate: ${({ menuactive }) => (menuactive === "true" ? "180deg" : "0deg")} !important;
`;
export const DropMenu = styled.div`
  z-index: 10;
  position: absolute;
  top: 60px;
  right: -30px;

  width: 150px;
  height: 47px;
  padding: 8px;
  border-radius: 0px 0px 20px 20px;

  background: #171717;
  cursor: pointer;
  display: ${({ menuactive }) => (menuactive === "true" ? "block" : "none")} !important;
  button {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #fff;

    text-align: center;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #fff;
  }
`;

export const UserContainer = styled.div`
  min-height: 66px;
  width: 100%;
  .searchImg {
    height: 39px;
    width: 39px;
  }
  h1 {
    font-family: "Lato";
    font-weight: 400;
    //pode remover essas linha acima
    margin-left: 12px;
    font-size: 19px;
    color: #515151;
  }

  :hover {
    cursor: pointer;
  }
`;
