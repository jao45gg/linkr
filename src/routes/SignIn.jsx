import React, { useState } from "react";
import styled from "styled-components";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Container>
      <form>
        <AuthInput
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
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
      <Link to="/signup"><p>First time? Create an account!</p></Link>
    </Container>
  );
};

const Container = styled.div`
  width: 429px;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
    text-align: center;
  }
`;

export default SignIn;
