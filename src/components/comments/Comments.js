import React, { useEffect, useState } from "react";
import Comment from "./Comment.js";
import WriteComment from "./WriteComment.js";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import CommentSkeleton from "../loadings/CommentSkeleton.js";

const Comments = ({
  post_id,
  count,
  setCount,
  post_user_id,
  originalPostId,
  isReposting,
}) => {
  const [comments, setComments] = useState([]);
  const [followeds, setFolloweds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getComments = async () => {
      try {
        const postIdUrl = !isReposting ? post_id : originalPostId;
        const response = await axiosPrivate.get(`/comments/${postIdUrl}`);
        const response2 = await axiosPrivate.get("/follows");
        setComments(response.data);
        setFolloweds(response2.data);
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
    <CommentsContainer data-test="comment-box">
      {isLoading &&
        Array.from({ length: count }).map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      {!isLoading &&
        comments?.map((comment, id) => (
          <Comment
            data={comment}
            key={id}
            post_user_id={post_user_id}
            isFollowed={followeds.some(
              (followed) => followed.id === comment.user_id
            )}
          />
        ))}
      {!isReposting && (
        <WriteComment
          post_id={post_id}
          comments={comments}
          setComments={setComments}
          count={count}
          setCount={setCount}
        />
      )}
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  width: 100%;
  margin: 0 25px;
  background-color: #1e1e1e;
`;

export default Comments;
