import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  navigate("/timeline");
  return <></>;
};

export default Redirect;
