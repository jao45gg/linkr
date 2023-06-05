import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../components/loadings/LoadingPage";
import ErrorServer from "../components/ErrorServer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

export default function Users() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [erro, setErro] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    const promise =  axiosPrivate.get(`/users/getById/${id}`);
    promise.then((res) => {setData(res.data); console.log(res.data)});
    promise.catch((err) => {setErro(true);console.log(err)});
  
  }

  function Refresh() {
    getPosts();
  }

  return (
    <Container>
      <Titulo>
        <Imagem src={data?.picture}></Imagem>
        <h1>{`${data?.name}’s posts`}</h1>
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
                picture={item.user_picture}
                userName={item.user_name}
                userPostId={item.user_id}
                token={auth.accessToken}
                liked={item.userLiked}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(51, 51, 51);
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const Titulo = styled.div`
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  width: 611px;

  h1 {
    box-sizing: border-box;
    margin-left: 18px;
    padding-bottom: 8px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    /* identical to box height */
    color: #ffffff;
  }
`;

const Posts = styled.div`
  width: 100%;
`;

const Aside = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Imagem = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;
`;
