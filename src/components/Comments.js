import React, { useEffect, useState } from "react";
import Comment from "./Comment.js";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import CommentSkeleton from "./loadings/CommentSkeleton.js";

const Comments = ({ post_id, count }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { avatar } = useAuth().auth;

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axiosPrivate.get(`/comments/${post_id}`);
        setComments(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (count) getComments();
    else setIsLoading(false);
  }, []);
  return (
    <CommentsContainer>
      {isLoading &&
        Array.from({ length: count }).map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      {!isLoading &&
        comments?.map((comment, id) => <Comment data={comment} key={id} />)}
      <WriteComment>
        <UsrImgOnWriteComment picture={avatar} />
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
