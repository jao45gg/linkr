import React, { useEffect, useState } from "react";
import Comment from "./Comment.js";
import WriteComment from "./WriteComment.js";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import CommentSkeleton from "../loadings/CommentSkeleton.js";

const Comments = ({ post_id, count, setCount, post_user_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

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
        comments?.map((comment, id) => (
          <Comment data={comment} key={id} post_user_id={post_user_id} />
        ))}
      <WriteComment
        post_id={post_id}
        comments={comments}
        setComments={setComments}
        count={count}
        setCount={setCount}
      />
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  width: 100%;
  margin: 0 25px;
  background-color: #1e1e1e;
`;

export default Comments;
