import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommentSkeleton = () => {
  return (
    <Container>
      <CommentContainer>
        <CircleSkeleton />
        <Flex>
          <StyledSkeleton count={1} width={100} height={14} />
          <StyledSkeleton count={1} width={200} height={14} />
        </Flex>
      </CommentContainer>
    </Container>
  );
};

export default CommentSkeleton;
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
  strong:after {
    //receber o nome do usuário mudar content
    content: " • following";
    color: #565656;
    font-size: 14px;
    font-weight: 400;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  background: linear-gradient(to right, #ccc 87.267%, #ccc 12.733%);
`;

const CircleSkeleton = styled(Skeleton)`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 18px;
  background-color: #ccc;
`;