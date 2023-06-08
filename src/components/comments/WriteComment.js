import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const WriteComment = ({ post_id, comments, setComments, count, setCount }) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { avatar, name } = useAuth().auth;
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!newComment.trim()) {
        window.alert("Digite um comentário");
        return;
      }
      const body = { post_id, comment: newComment };
      const response = await axiosPrivate.post("/comments", body);
      const newComments = [...comments];
      newComments.unshift({ ...response.data, name, picture: avatar });
      setComments(newComments);
      setCount(parseInt(count) + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <WriteCommentContainer>
      <UsrImgOnWriteComment picture={avatar} />
      <InputContainer>
        <WriteCommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="write a comment..."
        />
        <StyledFiSend onClick={handleSubmit} />
      </InputContainer>
    </WriteCommentContainer>
  );
};

export default WriteComment;

const StyledFiSend = styled(FiSend)`
  font-size: 16px;
  margin-right: 11px;
  color: #fff;
  cursor: pointer;
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

const WriteCommentContainer = styled.div`
  margin: 9px 0;
  height: 53px;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;
