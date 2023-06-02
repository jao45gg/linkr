import { createContext, useState } from "react";
import React from "react";
import useCookieCheck from "../hooks/useCookieCheck";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [tokenOnStorage, setTokenOnStorage] = useLocalStorage(
    "refreshToken",
    ""
  );
  const cookiesAccepted = useCookieCheck();

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cookiesAccepted,
        tokenOnStorage,
        setTokenOnStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
