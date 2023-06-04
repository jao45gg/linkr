import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post.js";
import useAuth from "../hooks/useAuth.js";
import LoadingPage from "../components/loadings/LoadingPage.js";
import ErrorServer from "../components/ErrorServer.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

export default function Timeline() {
  const [form, setForm] = useState({ url: "", description: "" });
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [likesUser, setlikesUser] = useState();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    RefreshDataLikes();
    RefreshTimeline();
  }, []);

  function RefreshDataLikes() {
    const promise = axiosPrivate.get("/posts/");
    promise.then((res) => setData(res.data));
    promise.catch((err) => console.log(err));
  }

  function RefreshTimeline() {
    const promise = axiosPrivate.get("/posts/isliked");
    promise.then((res) => {
      setlikesUser(res.data);
    });
    promise.catch((err) => console.log(err));
  }

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function posting(event) {
    event.preventDefault();
    setDisabled(true);

    console.log(form);
    setDisabled(false);

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
        <Publish>
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
              />

              <textarea
                placeholder="Awesome article about #javascript"
                name={"description"}
                value={form.description}
                onChange={handleForm}
                disabled={disabled}
              />

              <Button type="submit" disabled={disabled}>
                <p>{disabled ? "Publishing..." : "Publish"}</p>
              </Button>
            </Block>
          </form>
        </Publish>
        <Aside>
          {erro === true ? (
            <ErrorServer
              message={
                "An error occured while trying to fetch the posts, please refresh the page"
              }
            />
          ) : data.length === 0 ? (
            <ErrorServer message={"There are no posts yet"} />
          ) : data !== undefined && likesUser !== undefined ? (
            data.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                link={item.link}
                description={item.description}
                userId={auth.id}
                likes={item.likes}
                picture={item.picture}
                userName={item.name}
                userPostId={item.userPostId}
                token={auth.accessToken}
                liked={likesUser.some((like) => like.post_id === item.id)}
                RefreshDataLikes={RefreshDataLikes}
                RefreshTimeline={RefreshTimeline}
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
  max-width: 660px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const Titulo = styled.div`
  margin-bottom: 20px;

  h1 {
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

const Publish = styled.div`
  width: 611px;
  height: 209px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 10px;
  position: relative;

  margin: 10px auto;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 10px auto;
  }
`;

const Imagem = styled.div`
  background-color: lightcoral;
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background: url(${(props) => props.picture});
  background-size: cover;
  background-position: center center;

  position: absolute;
  left: 15px;
  top: 20px;
`;

const Block = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  width: 80%;
  margin-right: 20px;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 5px;
    padding-top: 20px;
  }

  textarea {
    background: #efefef;
    border-radius: 5px;
    border: none;
    resize: none;
    display: flex;
    flex-wrap: wrap;

    width: 90%;
    height: 100px;
  }

  textarea::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */
    padding-top: 8px;
    padding-left: 7px;

    color: #949494;
  }
`;

const Input = styled.input`
  width: 90%;
  height: 30px;

  background: #efefef;
  border-radius: 5px;
  border: none;

  margin-bottom: 10px;

  ::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */
    padding-top: 8px;
    padding-left: 7px;

    color: #949494;
  }
`;

const Button = styled.button`
  width: 112px;
  height: 30px;

  background: #1877f2;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 120%;
  right: 10%;
  transform: translateY(-50%);

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    color: #ffffff;

    margin-top: -10px;
  }
`;
