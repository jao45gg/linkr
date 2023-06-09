import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import AuthInput from "../components/authRoute/forms/Input.js";
import AuthButton from "../components/authRoute/forms/Button.js";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios.js";
import ErrWrapper from "../components/authRoute/forms/Err.js";
import useAuth from "../hooks/useAuth.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { setAuth, setTokenOnStorage, cookiesAccepted } = useAuth();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrMsg("Email inválido");
      window.alert("Email inválido");
      return;
    }
    if (!password) {
      setErrMsg("Insira uma senha");
      window.alert("Insira uma senha");
      return;
    }
    if (password.length < 2) {
      setErrMsg("Senha deve possuir pelo menos 6 caracteres");
      window.alert("Senha deve possuir pelo menos 6 caracteres");
      return;
    }
    const body = { email, password, cookiesAccepted };

    try {
      setIsLoading(true);
      const response = await axiosPrivate.post("/signin", body);
      setAuth(response.data);
      if (!cookiesAccepted) {
        setTokenOnStorage(response?.data?.refreshToken);
      }

      navigate("/timeline", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando Email e/ou senha");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
        window.alert("Não autorizado");
      } else if (err.response?.status === 409) {
        setErrMsg("Falha ao logar");
      } else {
        setErrMsg("Falha ao logar");
      }
      errRef.current.focus();
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ErrWrapper
        status={errMsg ? "errmsg" : "offscreen"}
        posTop="-80px"
        posLeft={"0px"}
        width={"429px"}
      >
        <span ref={errRef}>{errMsg}</span>
      </ErrWrapper>
      <form onSubmit={handleSubmit}>
        <AuthInput
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          ref={emailRef}
          data-test="email"
        />
        <AuthInput
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          data-test="password"
        />
        <AuthButton disabled={isLoading} data-test="login-btn">Log In</AuthButton>
      </form>
      <Link to="/sign-up" data-test="sign-up-link">
        <P>First time? Create an account!</P>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  max-width: 429px;
  && span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const P = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  text-align: center;
`;

export default SignIn;
