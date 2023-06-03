import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider.js";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
