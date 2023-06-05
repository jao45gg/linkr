import { useEffect, useState } from "react";
import Post from "../components/Post.js";
import useAuth from "../hooks/useAuth.js";
import LoadingPage from "../components/loadings/LoadingPage.js";
import ErrorServer from "../components/ErrorServer.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
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
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    Refresh();
  }, []);

  function Refresh() {
    const promise = axiosPrivate.get("/posts/");
    promise.then((res) => setData(res.data));
    promise.catch((err) => console.log(err));
  }

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function posting(event) {
    event.preventDefault();
    setDisabled(true);
    console.log(form);

    const promise = axiosPrivate.post("/posts/", form);
    promise.then(() => {
      setDisabled(false);
      setForm({ url: "", description: "" });
      const promise = axiosPrivate.get("/posts/");
      promise.then((res) => setData(res.data));
      promise.catch((err) => console.log(err));
    });
    promise.catch(() => {
      setDisabled(false);
      setErro(true);
    });
  }

  return (
    <Container>
      <Titulo>
        <h1> {"timeline"} </h1>
      </Titulo>
      <Posts>
        <Publish data-test="publish-box">
          <Imagem picture={auth.avatar} />
          <form onSubmit={posting}>
            <Block>
              <p>{"What are you going to share today?"}</p>
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
            <ErrorServer message={"There are no posts yet"} data-test="message"/>
          ) : data !== undefined ? (
            data.map((item) => (
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
