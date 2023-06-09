import { HStyle, HContent } from "../../styles/HeaderBarStyle.js";
import Logout from "./Logout.js";
import Input from "./Input.js";
import useAuth from "../../hooks/useAuth.js";

const Header = () => {

  const {auth} = useAuth()
  
  return (
    <HStyle>
      <HContent  picture={auth?.avatar}>
        <div>
          <a href="/">linkr</a>
        </div>
        <Input />
        <Logout />
      </HContent>
    </HStyle>
  );
};
export default Header;
