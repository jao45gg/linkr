import { createContext, useState } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [tokenOnStorage, setTokenOnStorage] = useLocalStorage(
    "refreshToken",
    ""
  );
  const [cookiesAccepted, setCookiesAccepted] = useState("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cookiesAccepted: false,
        setCookiesAccepted,
        tokenOnStorage,
        setTokenOnStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
