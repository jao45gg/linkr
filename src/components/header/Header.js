import { HStyle, HContent } from "../../styles/HeaderBarStyle.js";
import Logout from "./Logout.js";
import Input from "./Input.js";

const Header = () => {
  return (
    <HStyle>
      <HContent>
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
