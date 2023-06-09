import { useEffect, useState } from "react";
import Post from "../components/Post.js";
import useAuth from "../hooks/useAuth.js";
import LoadingPage from "../components/loadings/LoadingPage.js";
import ErrorServer from "../components/ErrorServer.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "use-interval";
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
import styled from "styled-components";

let page;

export default function Timeline({ setNewRequest }) {
  const [form, setForm] = useState({ url: "", description: "" });
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    page = 1;
    Refresh();
  }, []);

  function Refresh() {
    const promise = axiosPrivate.get(`/posts/${page} ${offset}`);
    promise.then((res) => {
      if (res.data[res.data.length - 1]?.id !== data[data.length - 1]?.id) {
        setData(res.data);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
    promise.catch((err) => console.log(err));
  }

  useInterval(() => {
    if (data.length > 0) {
      const promise = axiosPrivate.get(`/posts/newPosts/${data[0]?.id}`);
      promise
        .then((res) => {
          if (((data.length / page) + res.data) > 10) {
            setOffset((data.length / page) + res.data - 10);
          } else if (data.length < 10) {
            Refresh();
          }
        })
        .catch((res) => {
          alert(res.message);
        });
    }
  }, 15000);
  
  useEffect(() => {
    if (offset === 0) Refresh();
  }, [offset]);

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function posting(event) {
    event.preventDefault();
    setDisabled(true);

    const promise = axiosPrivate.post("/posts/", form);
    promise
      .then(() => {
        Refresh();
      })
      .catch((res) => {
        alert(res.message);
      })
      .finally(() => {
        setDisabled(false);
        setForm({ url: "", description: "" });
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
              message={
                "An error occured while trying to fetch the posts, please refresh the page"
              }
            />
          ) : data.length === 0 ? (
            <ErrorServer
              message={"There are no posts yet"}
              data-test="message"
            />
          ) : data !== undefined ? (
            <>
              <ButtonNewposts
                display={offset > 0 ? "flex" : "none"}
                onClick={() => {
                  setOffset(0);
                }}
              >
                {`${offset} new posts, load more!`}
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2391 4.19004e-06C15.4598 4.19004e-06 18.9272 3.10714 19.513 7.14285H22L17.8152 11.9048L13.6304 7.14285H16.4043C16.1369 5.9775 15.4804 4.93688 14.5423 4.19091C13.6042 3.44495 12.4397 3.03771 11.2391 3.03571C9.50543 3.03571 7.975 3.88095 7.00652 5.15476L4.96196 2.83333C5.74453 1.94233 6.70962 1.22848 7.79235 0.739766C8.87507 0.251055 10.0503 -0.00118567 11.2391 4.19004e-06ZM10.7609 16C6.55217 16 3.07283 12.8928 2.48696 8.85714H0L4.18478 4.09524C5.5837 5.67857 6.97065 7.27381 8.36957 8.85714H5.59565C5.86314 10.0225 6.51955 11.0631 7.45769 11.8091C8.39583 12.555 9.56028 12.9623 10.7609 12.9643C12.4946 12.9643 14.025 12.119 14.9935 10.8452L17.038 13.1667C16.2562 14.0586 15.2913 14.773 14.2084 15.2618C13.1255 15.7506 11.9498 16.0023 10.7609 16Z"
                    fill="white"
                  />
                </svg>
              </ButtonNewposts>
              <InfiniteScroll
                pageStart={0}
                hasMore={hasMore}
                loadMore={() => {
                  page++;
                  Refresh();
                }}
                loader={<div key={0}>Carregando...Carregando...</div>}
              >
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
            </>
          ) : (
            <LoadingPage />
          )}
        </Aside>
      </Posts>
    </Container>
  );
}

const ButtonNewposts = styled.button`
  display: ${(props) => props.display};
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 611px;
  height: 61px;
  padding: 0;
  margin-left: 10px;
  margin-bottom: 17px;
  margin-top: 30px;
  color: #ffffff;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  @media (max-width: 719px) {
    width: 90%;
  }

  svg {
    margin-left: 10px;
  }
`;
