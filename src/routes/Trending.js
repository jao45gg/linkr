import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/Post.js";
import useAuth from "../hooks/useAuth.js";
import LoadingPage from "../components/loadings/LoadingPage.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { Container, Titulo, Posts, Aside } from "../styles/TimeLineStyle.js";

const Trending = () => {
  const params = useParams();
  const [hashDetail, setHashDetail] = useState([]);
  const { auth } = useAuth();
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getHash = async () => {
      try {
        const hashtags = await axios.get(`/hashtags/${params.hashtag}`);
        if (hashtags.data.length > 0) {
          setHashDetail(hashtags.data);
        } else {
          setHashDetail(undefined);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getHash();
  }, [axios, params]);

  return (
    <Container>
      <Titulo>
        <div>
          <p data-test="hashtag-title">{`# ${params.hashtag}`}</p>
        </div>
      </Titulo>
      <Posts>
        <Aside>
          {hashDetail !== undefined ? (
            hashDetail.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                link={item.link}
                description={item.description}
                userId={auth.id}
                likes={[]}
                shares={undefined}
                picture={item.user_picture}
                userName={item.user_name}
                userPostId={item.user_id}
                token={auth.accessToken}
                liked={"userLiked"}
                Refresh={() => { }}
                commentsCount={[]}
                data-test="post"
              />
            ))
          ) : (
            <LoadingPage />
          )}
        </Aside>
      </Posts>
    </Container>
  );
};
export default Trending;
