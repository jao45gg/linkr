import { useState, useEffect } from "react";
import { Sidebar } from "../../styles/LayoutStyle.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Trending = () => {
  const axios = useAxiosPrivate();
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
  }, [axios]);

  return (
    <Sidebar>
      <div>
        <h3>trending</h3>
        <ul>{trending.length && trending?.map((trend) => <li key={trend.id}>{trend.hash_name}</li>)}</ul>
      </div>
    </Sidebar>
  );
};

export default Trending;
