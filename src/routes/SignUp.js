import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import AuthInput from "../components/authRoute/forms/Input.js";
import AuthButton from "../components/authRoute/forms/Button.js";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios.js";
import ErrWrapper from "../components/authRoute/forms/Err.js";
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
    try {
    setIsLoading(true);
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

   
      await axiosPrivate.post("/signup", body);

      navigate("/", { replace: true });
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
          data-test="email"
          required
        />
        <AuthInput
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          data-test="password"
          required
        />
        <AuthInput
          placeholder="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          disabled={isLoading}
          data-test="username"
          required
        />
        <AuthInput
          placeholder="picture url"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
          disabled={isLoading}
          data-test="picture-url"
          required
        />
        <AuthButton disabled={isLoading} data-test="sign-up-btn">Sign Up</AuthButton>
      </form>
      <Link to="/" data-test="login-link">
        <P>Switch back to log in</P>
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

export default SignUp;
