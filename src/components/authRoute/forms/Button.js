import React from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import useWindowSize from "../../../hooks/useWindowSize.js";

const Button = (props) => {
  const { width } = useWindowSize();
  return (
    <StyledButton {...props} mobile={width < 860}>
      {props.disabled ? (
        <ThreeDots
          height="60"
          width="80"
          radius="15"
          color="#1072f1"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        props.children // Render the text directly
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  height: ${(props) => (props.mobile ? "55px" : "65px")};
  background: #1877f2;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 13px;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    background-color: rgb(224, 237, 253);
    color: #999;
    cursor: not-allowed;
    text-decoration: line-through;
  }

  button:not(:disabled):hover,
  button:not(:disabled):focus {
    background: #1072f1;
    border: 2px solid white;
    outline: none;
  }
`;

export default Button;
