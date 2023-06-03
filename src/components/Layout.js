import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { DebounceInput } from 'react-debounce-input';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

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
      margin-left: 30px;
      cursor: pointer;
    }
  }

  .search {
    width: 563px;
    border-radius: 8px;
    height: 45px;
    border: none;
    padding-left: 17px;
    box-sizing: border-box;
    background: #ffffff;
  }
  .search input {
    width: 90%;
    height: 100%;
    border: none;
    background: none;
    outline: none;
    font-family: "Lato";
    font-size: 19px;
    line-height: 23px;
    color: #c6c6c6;
  }
  .search img {
    width: 26px;
    height: 22px;
    margin-left: 10px;
    cursor: pointer;
  }

  .input-menu {
    width: 563px;
    border-radius: 8px;
    position: absolute;
    display: flex;
    left: 35%;
    top: 7%;
    max-height: 176px;
    flex-direction: column;
    justify-content: space-between;
    background-color: #E7E7E7;
    :hover{
      .users{
        display: flex !important;
      }
    }
    .users {
      width: 100%;
      display: none;
      flex-direction: column;
      overflow-y: scroll;
    }
  }


`;
const DropIcon = styled.img`
  width: 20px !important;
  height: 20px !important;
  position: relative;
  cursor: pointer;
  rotate: ${({ menuActive }) => (menuActive ? "180deg" : "0deg")} !important;
`;
const DropDownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 0;

  width: 150px;
  height: 47px;
  padding: 8px;
  border-radius: 0px 0px 20px 20px;

  background: #171717;
  cursor: pointer;
  display: ${({ menuActive }) => (menuActive ? "block" : "none")} !important;
  P {
    margin-top: 12px;
    text-align: center;
    font-family: "Lato";
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #fff;
  }
`;

const UserContainer = styled.div`
  min-height: 66px;
  width: 100%;
  .searchImg {
    height: 39px;
    width: 39px;
  }
  h1{
    font-family: "Lato";
    font-weight: 400;
    margin-left: 12px;
    font-size: 19px;
    color: #515151;
  }

  :hover {
    cursor: pointer;
  }
`

const Layout = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [name, setName] = useState("");
  const [usersData, setUsersData] = useState([]);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();

  const logoutMenu = () => {
    setMenuActive(!menuActive);
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setAuth("");
      navigate("/");
    } catch (error) {
      alert("Erro ao fazer logout");
    }
  };

  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await axios.get("/hash");
        setTrending(response.data.hashtags);
      } catch (error) {
        alert("Erro ao carregar os trending");
      }
    };
    getTrending();
  }, [axios]);

  useEffect(() => {
    async function getUsers() {
      try {
        if (name !== "") {
          const data = await axios.get(`/users/getByName/${name}`);
          setUsersData(data.data);
        }
      } catch (err) {
        setUsersData([]);
      }
    }
    getUsers();
  }, [name, axios]);

  return (
    <LayoutContent>
      <HeaderBar>
        <HeaderContent>
          <div>
            <a href="/">linkr</a>
          </div>
          <div className="input-menu">
            <div>
              <div className="search">
                <DebounceInput
                  type="text"
                  placeholder="Search for people"
                  minLength={3}
                  debounceTimeout={300}
                  onChange={(e) => setName(e.target.value)}
                />
                <img src="/search.svg" alt="search" />
              </div>
            </div>
            <div className="users">
              {usersData.length > 0 &&
                usersData.map((m, index) => (
                  <UserContainer
                    onClick={() => {
                      navigate(`/user/${m.id}`);
                      location.reload();
                    }}
                    key={index}>
                    <img className="searchImg" src={m.picture} />
                    <h1>{m.name}</h1>
                  </UserContainer>
                ))}
            </div>
          </div>
          <div>
            <DropIcon onClick={logoutMenu} menuActive={menuActive} src="/drop down icon.svg" alt="drop" />
            <img
              onClick={() => {
                navigate(`/user/${auth?.id}`);
                location.reload();
              }}
              src={auth?.avatar}
              alt="profile"
            />
            <DropDownMenu menuActive={menuActive} onClick={logout}>
              <p>Logout</p>
            </DropDownMenu>
          </div>
        </HeaderContent>
      </HeaderBar>
      <ResponsiveContainer>
        <ContentContainer>
          <Outlet />
          <Sidebar>
            <div>
              <h3>trending</h3>
              <ul>
                {trending.map((trend) => (
                  <li key={trend.id}>{trend.name}</li>
                ))}
              </ul>
            </div>
          </Sidebar>
        </ContentContainer>
      </ResponsiveContainer>
    </LayoutContent>
  );
};

const ResponsiveContainer = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 920px) {
    width: 100%;
    align-items: center;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
  width: 100%;
`;
const Sidebar = styled.div`
  width: 301px;
  display: none;
  overflow: hidden;

  @media (min-width: 920px) {
    display: block;
  }
  div {
    width: 100%;
    padding: 30px 0;
    background: #171717;
    border-radius: 16px;
  }
  div h3 {
    border-bottom: 1px solid #484848;
    width: 100%;
    height: 40px;
    padding: 0px 20px;
    padding-bottom: 9px;

    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    color: #ffffff;
  }
  div ul {
    width: 100%;
    box-sizing: border-box;

    margin: 9px 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      padding: 9px 20px;

      box-sizing: border-box;
      font-family: "Lato";
      font-weight: 700;
      font-size: 19px;
      line-height: 23px;
      letter-spacing: 0.05em;

      color: #ffffff;
    }
    li:before {
      content: "# ";
    }

    li:hover {
      background: #353535;
      border-radius: 8px;
    }
  }
`;

export default Layout;