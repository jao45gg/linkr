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


const StyledFiSend = styled(FiSend)`
  font-size: 16px;
  margin-right: 11px;
  color: #fff;
  cursor: pointer;
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
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 39px;
  border-radius: 8px;
  background: #252525;
`;
const WriteCommentInput = styled.input`
  width: 92%;
  background: none;
  border: none;
  outline: none;
  ::placeholder {
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
  }
  &:valid {
    color: #ccc;
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
