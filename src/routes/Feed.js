import React from 'react';
import styled from "styled-components";

const FeedContent = styled.div`
  width: 611px;
  background-color: #333;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  overflow-y: scroll;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: #252525;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
  @media (max-width: 719px) {
    width: 100%;
    margin-top: 0;
    padding: 0;
  }
`;

const Feed = () => {
  return (
    <FeedContent>
      <h1>Feed</h1>
      <p>hello word</p>
    </FeedContent>
  );
};

export default Feed;