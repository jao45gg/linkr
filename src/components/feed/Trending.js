import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../styles/LayoutStyle.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Trending = ({ newRequest }) => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await axios.get("/hashtags");
        setTrending(response.data);
      } catch (error) {
        setTrending([]);
        alert("Erro ao os trending");
      }
    };
    getTrending();
  }, [axios, newRequest]);

  const hashPage = (hashtag) => {
    navigate(`/hashtag/${hashtag}`);
  };

  return (
    <Sidebar>
      <div data-test="trending">
        <h3>trending</h3>
        <ul>
          {trending.length &&
            trending?.map((trend, index) => (
              <li key={index} data-test="hashtag" onClick={() => hashPage(trend.hash_name)}>
                {trend.hash_name}
              </li>
            ))}
        </ul>
      </div>
    </Sidebar>
  );
};

export default Trending;
