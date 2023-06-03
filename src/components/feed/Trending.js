import { useState, useEffect } from "react";
import { Sidebar } from "../../styles/LayoutStyle.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Trending = () => {
  const axios = useAxiosPrivate();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await axios.get("/hash");
        setTrending(response.data.hashtags);
      } catch (error) {
        // alert("Erro ao carreimage.pnggar os trending");
      }
    };
    getTrending();
  }, [axios]);

  return (
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
  );
};

export default Trending;
