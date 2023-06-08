import { useEffect, useState } from "react";
import Post from "../components/Post.js";
import useAuth from "../hooks/useAuth.js";
import LoadingPage from "../components/loadings/LoadingPage.js";
import ErrorServer from "../components/ErrorServer.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import InfiniteScroll from 'react-infinite-scroller';
import {
  Container,
  Titulo,
  Posts,
  Aside,
  Publish,
  Imagem,
  Block,
  Input,
  Button,
} from "../styles/TimeLineStyle.js";

export default function Timeline() {
  const [form, setForm] = useState({ url: "", description: "" });
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [offset, setOffset] = useState(0);
  let page = 1;
  const [refreshState, setRefreshState] = useState(true);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    Refresh();
  }, []);

  function handleScroll(num) {
    page = num;
    Refresh();
  }

  function Refresh() {
    const promise = axiosPrivate.get(`/posts/${page} ${offset}`);
    promise.then((res) => {
      setData(res.data);
    });
    promise.catch((err) => console.log(err));

    promise.finally(()=>{
      setDisabled(false);
      setForm({ url: "", description: "" });
    })
  } 

  if (data.length > 0 && refreshState) {
    setInterval(checkNewPosts, 15000);
    setRefreshState(false);
  }

  function checkNewPosts() {
    const promise = axiosPrivate.get(`/posts/newPosts/${data[0]?.id}`);
    promise.then(res => {
      if ((data.length + res.data) > 10) {
        setOffset(((data.length + res.data) - 10));
      }
    })
  }

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function posting(event) {
    event.preventDefault();
    setDisabled(true);

    const promise = axiosPrivate.post("/posts/", form);
    promise.then(() => {
      Refresh();
    });
    promise.catch(() => {
      setErro(true);
    });
  }

  return (
    <Container>
      <Titulo>
        <div>
          <p>timeline</p>
        </div>
      </Titulo>
      <Posts>
        <Publish data-test="publish-box">
          <Imagem picture={auth.avatar} />
          <form onSubmit={posting}>
            <Block>
              <h5>{"What are you going to share today?"}</h5>
              <Input
                type="url"
                placeholder="http://..."
                name={"url"}
                value={form.url}
                onChange={handleForm}
                disabled={disabled}
                required
                data-test="link"
              />

              <textarea
                placeholder="Awesome article about #javascript"
                name={"description"}
                value={form.description}
                onChange={handleForm}
                disabled={disabled}
                data-test="description"
              />

              <Button type="submit" disabled={disabled} data-test="publish-btn">
                <p>{disabled ? "Publishing..." : "Publish"}</p>
              </Button>
            </Block>
          </form>
        </Publish>
        <Aside>
          {erro === true ? (
            <ErrorServer
              message={"An error occured while trying to fetch the posts, please refresh the page"}
            />
          ) : data.length === 0 ? (
            <ErrorServer message={"There are no posts yet"} data-test="message" />
          ) : data !== undefined ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={() => handleScroll(page + 1)}
              loader={<div key={0}>Carregando...Carregando...</div>}>
              {data.map((item) => (
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
              ))}
            </InfiniteScroll>
          ) : (
            <LoadingPage />
          )}
        </Aside>
      </Posts>
    </Container>
  );
}
