import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { UserContainer } from "../../styles/HeaderBarStyle.js";

const Input = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [usersData, setUsersData] = useState([]);
  const axios = useAxiosPrivate();

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
    <div className="input-menu">
      <div className="search">
        <DebounceInput
          type="text"
          placeholder="Search for people"
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => setName(e.target.value)}
        />
        <AiOutlineSearch />
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
  );
};

export default Input;
