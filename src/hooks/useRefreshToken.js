import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, cookiesAccepted, tokenOnStorage } = useAuth();

  const refresh = async () => {
    try {
      let response;
      if (cookiesAccepted) {
        response = await axios.get("/refresh", {
          withCredentials: true,
        });
      } else {
        response = await axios.get("/refreshnojwt", {
          withCredentials: true,
          Authorization: `Bearer ${tokenOnStorage}`,
        });
      }

      setAuth({ ...response.data });
      return response.data.accessToken;
    } catch (err) {
      setAuth();
    }
  };
  return refresh;
};

export default useRefreshToken;
