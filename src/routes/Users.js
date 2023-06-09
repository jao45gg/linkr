import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../components/loadings/LoadingPage";
import ErrorServer from "../components/ErrorServer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { Container, Titulo, Posts, Aside } from "../styles/TimeLineStyle.js";
import { ThreeDots } from "react-loader-spinner";

export default function Users() {
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [erro, setErro] = useState(false);
  const [following, setFollowing] = useState(false);
  const [ownUser, setOwnUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await axiosPrivate.get(`/users/getById/${id}`);
      const { data: follow } = await axiosPrivate.get(`/follows/checkfollowing/${id}`);
      follow.ownUser === true ? setOwnUser(true) : setOwnUser(false);
      follow.following === true ? setFollowing(true) : setFollowing(false);
      setData(data);
    } catch (error) {
      setErro(true);
      console.log(error);
    }
  };

  const connectUser = async () => {
    try {
      setLoading(true);
      if (following) {
        await axiosPrivate.post("/follows/unfollow", { id });
        setFollowing(false);
      } else {
        await axiosPrivate.post("/follows/follow", { id });
        setFollowing(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Titulo>
        <div>
          <Imagem picture={data?.picture}></Imagem>
          <p>{`${data?.name}’s posts`}</p>
        </div>
        <div>
          {ownUser ? (
            <></>
          ) : (
            <button
              data-test="follow-btn"
              className={following ? "following" : "not-following"}
              onClick={connectUser}>
              {loading ? (
                <ThreeDots
                  height="12"
                  width="24"
                  radius="8"
                  color="#1072f1"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : following ? (
                "Following"
              ) : (
                "Follow"
              )}
            </button>
          )}
        </div>
      </Titulo>
      <Posts>
        <Aside>
          {erro === true ? (
            <ErrorServer
              message={"An error occured while trying to fetch the posts, please refresh the page"}
            />
          ) : data && data.posts && data.posts.length === 0 ? (
            <ErrorServer message={"There are no posts yet"} />
          ) : data && data.posts ? (
            data.posts.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                link={item.link}
                description={item.description}
                userId={auth.id}
                likes={item.likes}
                shares={item.shares}
                picture={item.user_picture}
                userName={item.user_name}
                userPostId={item.user_id}
                token={auth.accessToken}
                liked={item.userLiked}
                Refresh={() => getPosts()}
                commentsCount={item.commentsCount}
              />
            ))
          ) : (
            <LoadingPage />
          )}
        </Aside>
      </Posts>
    </Container>
  );
}

const Imagem = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;
`;
