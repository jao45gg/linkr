import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [tokenOnStorage, setTokenOnStorage] = useLocalStorage("refreshToken", "");
  //apagar isso depois
  const [cookiesAccepted, setCookiesAccepted] = useState("");
  console.log(cookiesAccepted);
  //apagar isso depois
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cookiesAccepted: false,
        setCookiesAccepted,
        tokenOnStorage,
        setTokenOnStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
