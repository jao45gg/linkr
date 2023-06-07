import React, { useState } from "react";
import Comment from "./Comment.js";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";

const Comments = () => {
  const [newComment, setNewComment] = useState("");
  return (
    <CommentsContainer>
      <Comment />
      <Comment />
      <Comment />
      <WriteComment>
        <UsrImgOnWriteComment
          picture={"https://mcdn.wallpapersafari.com/medium/53/45/xaZHSJ.jpg"}
        />
        <InputContainer>
          <WriteCommentInput
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="write a comment..."
          />
          <StyledFiSend />
        </InputContainer>
      </WriteComment>
    </CommentsContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const StyledFiSend = styled(FiSend)`
  font-size: 16px;
  color: #ffffff;
  position: absolute;
  right: 12.5px;
  top: 11.5px;
`;

const CommentsContainer = styled.div`
  width: 100%;
  margin: 0 25px;
  background-color: #1e1e1e;
`;

const WriteComment = styled.div`
  margin: 9px 0;
  height: 53px;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;
const WriteCommentInput = styled.input`
  width: 100%;
  height: 39px;
  background: #252525;
  border-radius: 8px;
  position: relative;

  ::placeholder {
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
  }
  &:valid {
    color: #CCC;
  }
`;
const UsrImgOnWriteComment = styled.div`
  cursor: pointer;
  width: 39px;
  height: 39px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;
  margin-right: 18px;
`;
export default Comments;
