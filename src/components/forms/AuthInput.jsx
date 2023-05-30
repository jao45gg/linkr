import React from "react";
import styled from "styled-components";

const AuthInput = React.forwardRef((props, ref) => {
  return (
    <>
      <StyledAuthInput ref={ref} {...props} />
    </>
  );
});

const StyledAuthInput = styled.input`
  height: 65px;
  background: #ffffff;
  border-radius: 6px;
  width: calc(100% - 18px);
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

export default AuthInput;
