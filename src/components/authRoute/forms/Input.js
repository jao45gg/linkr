import React from "react";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize.js";

const Input = React.forwardRef(function InputComponent(props, ref) {
  const { width } = useWindowSize();
  return <StyledInput ref={ref} {...props} mobile={width < 860} />;
});

Input.displayName = "Input";

const StyledInput = styled.input`
  height: ${(props) => (props.mobile ? "55px" : "65px")};
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  padding-left: 12px;
  margin-bottom: 13px;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: black;

  ::placeholder {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
  }

  :focus {
    border: 2px solid #ffffff;
    background-color: rgb(224, 237, 253);
    outline: none;
  }
  :disabled {
    background-color: rgb(224, 237, 253);
    color: #999;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;

export default Input;
