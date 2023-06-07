import React from "react";
import styled from "styled-components";

const Comment = () => {
  return (
    <Container>
      <CommentContainer>
        <Imagem
          picture={"https://mcdn.wallpapersafari.com/medium/53/45/xaZHSJ.jpg"}
        />
        <Flex>
          <p>
            <strong>João Tavares</strong> • following
          </p>
          <p>Adorei esse post, ajuda muito a usar Material UI com React!</p>
        </Flex>
      </CommentContainer>
      <Line />
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  background-color: #1E1E1E;
`;

const CommentContainer = styled.section`
  background-color: #1e1e1e;
  border-radius: 16px;
  min-height: 53px;
  margin: 9px 0;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 25px;

  @media (max-width: 719px) {
    width: 100%;
  }
`;

const Imagem = styled.div`
  cursor: pointer;
  width: 39px;
  height: 39px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;
  margin-right: 18px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
  }

  strong {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }
`;

const Line = styled.div`
  width: calc(100% - 40px);
  height: 0px;
  border: 1px solid #353535;
  transform: rotate(-0.1deg);
  margin: 0 auto;
`;
