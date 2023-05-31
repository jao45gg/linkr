import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import AuthInput from "../components/forms/AuthInput";
import AuthButton from "../components/forms/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import ErrWrapper from "../components/forms/Err";
import { isUri } from "valid-url";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, user, pictureUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrMsg("Email inválido");
      return;
    }
    if (!password) {
      setErrMsg("Insira uma senha");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Senha deve possuir pelo menos 6 caracteres");
      return;
    }
    const body = { email, password };

    try {
      setIsLoading(true);
      await axiosPrivate.post("/signin", body);

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando Email e/ou senha");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      } else if (err.response?.status === 409) {
        setErrMsg("Falha ao logar");
      } else {
        setErrMsg("Falha ao logar");
      }
      errRef.current.focus();
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
        />
        <AuthInput
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <AuthButton disabled={isLoading}>Log In</AuthButton>
      </form>
      <Link to="/signup">
        <p>First time? Create an account!</p>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  width: 429px;
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
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  text-align: center;
`;

export default SignIn;
