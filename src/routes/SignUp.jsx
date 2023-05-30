import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import AuthInput from "../components/forms/AuthInput";
import AuthButton from "../components/forms/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import ErrWrapper from "../components/forms/Err";
import { isUri } from "valid-url";

const SignUp = () => {
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
      window.alert("Email inválido");
      return;
    }
    if (!password) {
      setErrMsg("Insira uma senha");
      window.alert("Insira uma senha");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Senha deve possuir pelo menos 6 caracteres");
      window.alert("Senha deve possuir pelo menos 6 caracteres");
      return;
    }
    if (!user) {
      setErrMsg("Preencha o campo user");
      window.alert("Preencha o campo user");
      return;
    }
    if (!isUri(pictureUrl)) {
      setErrMsg("Picture url deve ser uma url válida");
      window.alert("Picture url deve ser uma url válida");
      return;
    }
    const body = { email, password, name: user, picture: pictureUrl };

    try {
      setIsLoading(true);
      await axiosPrivate.post("/signup", body);

      navigate("/signin", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando nome, email e/ou senhas");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      } else if (err.response?.status === 409) {
        setErrMsg("E-mail em uso");
        window.alert("E-mail em uso");
      } else {
        setErrMsg("Falha ao criar a conta");
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
        <AuthInput
          placeholder="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          disabled={isLoading}
        />
        <AuthInput
          placeholder="picture url"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
          disabled={isLoading}
        />
        <AuthButton disabled={isLoading}>Sign Up</AuthButton>
      </form>
      <Link to="/signin">
        <P>Switch back to log in</P>
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

export default SignUp;
