import axios from "../api/axios";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
  const { setAuth, tokenOnStorage, cookiesAccepted, setCookiesAccepted } = useAuth();

  const checkCookiesWithBackend = async () => {
    try {
      await axiosPrivate.post("/check-cookies", { testCookie: "test-value" });
      const response = await axiosPrivate.get("/check-cookies");
      setCookiesAccepted(response.data.cookiesAccepted);
      return response.data.cookiesAccepted;
    } catch (error) {
      console.error("Erro na verificação de cookies:", error);
    }
  };

  const refresh = async () => {
    try {
      let response, useCookies;
      if (cookiesAccepted === "") {
        useCookies = await checkCookiesWithBackend();
      } else {
        useCookies = cookiesAccepted;
      }

      if (useCookies) {
        response = await axios.get("/refresh", {
          withCredentials: true,
        });
      } else {
        response = await axios.get("/refreshnojwt", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenOnStorage}`,
          },
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
