import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useAuth from "../../hooks/useAuth.js";
import { Drop, DropMenu } from "../../styles/HeaderBarStyle.js";

const Logout = () => {
  const [menuActive, setMenuActive] = useState(false);

  const navigate = useNavigate();
  const axios = useAxiosPrivate();
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

  return (
    <div>
      <Drop onClick={logoutMenu} menuActive={menuActive} />
      <img
        onClick={() => {
          navigate(`/user/${auth?.id}`);
          location.reload();
        }}
        src={auth?.avatar}
        alt="profile"
      />
      <DropMenu menuActive={menuActive} onClick={logout}>
        <p>Logout</p>
      </DropMenu>
    </div>
  );
};

export default Logout;
