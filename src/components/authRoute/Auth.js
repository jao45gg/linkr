import useWindowSize from "../../hooks/useWindowSize.js";
import LayoutDesktop from "./LayoutDesktop.js";
import LayoutMobile from "./LayoutMobile.js";

const Auth = () => {
  const { width } = useWindowSize();

  return width >= 860 ? <LayoutDesktop /> : <LayoutMobile />;
};

export default Auth;
