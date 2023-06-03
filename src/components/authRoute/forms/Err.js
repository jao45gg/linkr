import styled, { css } from "styled-components";

const Err = styled.p`
  ${({ status }) =>
    status === "offscreen"
      ? css`
          position: absolute;
          left: -9999px;
        `
      : status === "errmsg"
      ? css`
          background-color: lightpink;
          color: firebrick;
          font-weight: bold;
          font-size: 22px;
          position: absolute;
          width: ${(props) => (props?.width ? props.width : "769px")};
          height: 65px;
          top: ${(props) => (props?.posTop ? props.posTop : "55px")};
          left: ${(props) =>
            props?.posLeft ? props.posLeft : "calc(50% - 384.5px)"};
          border-radius: 6px;
        `
      : css`
          background-color: ${(props) => props.colors.success};
          color: darkgreen;
          font-weight: bold;
          font-size: 22px;
          position: absolute;
          width: ${(props) => (props?.width ? props.width : "769px")};
          height: 65px;
          top: ${(props) => (props?.posTop ? props.posTop : "55px")};
          left: ${(props) =>
            props?.posLeft ? props.posLeft : "calc(50% - 384.5px)"};
          border-radius: 6px;
        `}
`;

export const ErrWrapper = ({ children, status, posLeft, posTop, width }) => {
  return (
    <Err
      status={status}
      posLeft={posLeft}
      posTop={posTop}
      width={width}
      aria-live="assertive"
    >
      {children}
    </Err>
  );
};

export default ErrWrapper;
