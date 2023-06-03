import React from "react";
import useWindowSize from "../../hooks/useWindowSize.js";
import LayoutDesktop from "./LayoutDesktop.jsx";
import LayoutMobile from "./LayoutMobile.jsx";

const Auth = () => {
  const { width } = useWindowSize();

  return width >= 860 ? <LayoutDesktop /> : <LayoutMobile />;
};

export default Auth;
