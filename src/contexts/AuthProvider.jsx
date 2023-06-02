import { createContext, useState } from "react";
import React from "react";
import useCookieCheck from "../hooks/useCookieCheck";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const cookiesAccepted = useCookieCheck();

  return (
    <AuthContext.Provider value={{ auth, setAuth, cookiesAccepted }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
