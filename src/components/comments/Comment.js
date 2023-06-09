import React from "react";
import styled from "styled-components";

const Comment = ({ data, post_user_id, isFollowed }) => {

  return (
    <Container>
      <CommentContainer>
        <Imagem picture={data.picture} />
        <Flex>
          <p>
            <strong>
              {data.name}
            </strong>
            {data.user_id === post_user_id && " • post's author"}
            {data.user_id !== post_user_id && isFollowed && " • following"}
          </p>
          <p>{data.comment}</p>
        </Flex>
      </CommentContainer>
    </Container>
  );
};

export default Comment;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentContainer = styled.section`
  width: calc(100% - 40px);

  display: flex;
  align-items: center;
  position: relative;

  padding: 20px 0px;
  border-bottom: 1px solid #353535;
  background-color: #1e1e1e;

  @media (max-width: 719px) {
    width: 92%;
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
    margin-top: 3px;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.03em;
    line-height: 17px;
    color: #acacac;
  }

  strong {
    font-weight: 600;
    letter-spacing: 0.05em;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }
`;
