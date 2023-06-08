import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../components/loadings/LoadingPage";
import ErrorServer from "../components/ErrorServer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { Container, Titulo, Posts, Aside } from "../styles/TimeLineStyle.js";

export default function Users() {
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [erro, setErro] = useState(false);
  const [following, setFollowing] = useState(false);
  //fazer request para saber se o usuario logado segue o usuario da pagina
  //junto com o request dos posts

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    const promise = axiosPrivate.get(`/users/getById/${id}`);
    promise.then((res) => {
      setData(res.data);
      console.log(res.data);
    });
    promise.catch((err) => {
      setErro(true);
      console.log(err);
    });
  }

  function Refresh() {
    getPosts();
  }

  return (
    <Container>
      <Titulo>
        <div>
          <Imagem picture={data?.picture} ></Imagem>
          <p>{`${data?.name}’s posts`}</p>
        </div>
        <div>
          {/* se o user estiver visitando a pagina dele nao renderiza o botao */}
          <button
            className={following ? "following" : "not-following"}
            onClick={() => setFollowing((curr) => !curr)}>
            {following ? "Following" : "Follow"}
          </button>
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
                commentsCount={item.commentsCount}
                Refresh={Refresh}
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
