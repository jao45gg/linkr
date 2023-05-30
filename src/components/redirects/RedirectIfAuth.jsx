import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectIfAuth = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
};

export default RedirectIfAuth;
