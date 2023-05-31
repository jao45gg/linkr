import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import LayoutDesktop from "./LayoutDesktop";
import LayoutMobile from "./LayoutMobile";

const Auth = () => {
  const { width } = useWindowSize();

  return width >= 860 ? <LayoutDesktop /> : <LayoutMobile />;
};

export default Auth;
