import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import { Drop, DropMenu } from "../../styles/HeaderBarStyle.js";

const Logout = () => {
  const [menuactive, setMenuActive] = useState("false");

  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const { setAuth, auth } = useAuth();

  const logoutMenu = () => {
    if (menuactive === "true")
      setMenuActive("false");
    else if (menuactive === "false")
      setMenuActive("true")
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setAuth("");
      navigate("/");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      alert("Erro ao fazer logout");
    }
  };

  return (
    <div>
      <Drop onClick={logoutMenu} menuactive={menuactive} data-test="menu" />
      <img onClick={logoutMenu} data-test="avatar" />
      <DropMenu menuactive={menuactive} data-test="menu">
        <button onClick={logout} data-test="logout">
          Logout
        </button>
      </DropMenu>
    </div>
  );
};

export default Logout;
