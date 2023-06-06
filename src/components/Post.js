import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart, AiFillDelete, AiOutlineEdit, AiOutlineComment } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./feed/Modal.js";

export default function Post({
  id,
  link,
  description,
  userId,
  likes,
  picture,
  userName,
  liked,
  Refresh,
  userPostId,
}) {
  const [metaData, setMetaData] = useState();
  const [isLike, setIsLike] = useState(false);
  const [modal, setModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ description: "" });
  const currentPath = window.location.pathname.split("/");
  const editInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://jsonlink.io/api/extract?url=${link}`)
      .then((response) => {
        setMetaData(response.data); // faça o que quiser com os metadados
      })
      .catch((error) => {
        console.error("Erro ao obter os metadados da URL:", error);
      });
  }, [axiosPrivate, id, link]);

  const toggleIcon = (id, type) => {
    setIsLike(!isLike);

    if (type === true) {
      const promise = axiosPrivate.post(`/posts/likes/${id}`);
      promise.then(() => {
        Refresh();
      });

      promise.catch((err) => console.log(err));
    } else {
      const promise2 = axiosPrivate.post(`/posts/disliked/${id}`);
      promise2.then(() => {
        Refresh();
      });
      promise2.catch((err) => console.log(err));
    }
  };

  const getTooltipContent = () => {
    const contentUser = likes.some((item) => item.user_id === userId);
    const otherPeople = likes.filter((item) => item.user_id !== userId);

    if (contentUser) {
      const aleatoryNumber = Math.floor(Math.random() * otherPeople.length);
      if (likes.length - 2 === 1) {
        return `Você, ${otherPeople[aleatoryNumber].user_name} e outra pessoa`;
      } else {
        if (otherPeople.length === 0) {
          return `Você`;
        }
      }
      return `Você, ${otherPeople[aleatoryNumber]?.user_name} e outras ${likes.length - 2} pessoas`;
    } else {
      if (likes.length - 2 === 0) {
        return `${likes[likes.length - 1]?.user_name} e ${likes[likes.length - 2]?.user_name}`;
      } else {
        if (otherPeople.length === 1) {
          return `${likes[likes.length - 1]?.user_name}`;
        }
      }
      return `${likes[likes.length - 1]?.user_name}, ${likes[likes.length - 2]?.user_name} e ${
        likes.length - 2
      } pessoas`;
    }
  };

  const formatHashtags = (text) => {
    const hashtagRegex = /#[^\s#]+/g;
    const hashtags = text.match(hashtagRegex);

    if (!hashtags) {
      return text;
    }

    const parts = text.split(hashtagRegex);
    const formattedText = [];

    parts.forEach((part, index) => {
      formattedText.push(part);
      if (hashtags[index]) {
        formattedText.push(
          <span key={index} className="hashtag">
            {hashtags[index]}
          </span>
        );
      }
    });

    return formattedText;
  };

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(form);
      const promise = axiosPrivate.put(`/posts/edit/${id}`, form);
      promise.then(() => {
        setIsEditing(false);
        Refresh();
      });
      promise.catch(() => {
        alert("Não foi possível salvar alterações");
        isEditing(true);
      });
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  }

  return (
    <Container data-test="post">
      <Header>
        <Aside>
          <Imagem onClick={() => navigate(`/user/${userPostId}`)} picture={picture} />
          <Article>
            <div data-test="like-btn">
              {liked ? (
                <AiFillHeart
                  onClick={() => toggleIcon(id, false)}
                  style={{ fontSize: "30px", color: "#AC0000" }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => toggleIcon(id, true)}
                  style={{ fontSize: "30px", color: "#ffffff" }}
                />
              )}
            </div>
            <div data-test="tooltip" data-tooltip-content={getTooltipContent()} data-tooltip-id="example">
              <div data-test="counter">{likes.length !== 0 && `${likes.length} likes`}</div>
            </div>
            <Tooltip
              id="example"
              place="bottom"
              effect="solid"
              style={{
                backgroundColor: "#FFFFFF",
                width: "169px",
                borderRadius: "3px",
                color: "#505050",
              }}
            />
          </Article>
          <Article>
            <div>
              <AiOutlineComment style={{ fontSize: "30px", color: "#ffffff" }} />
            </div>
            <div>
              <div data-test="counter">{likes.length !== 0 && `${likes.length} comments`}</div>
            </div>
          </Article>
        </Aside>
      </Header>

      {metaData !== undefined && (
        <Section data-test="post">
          <Modal modal={modal} setModal={setModal} id={id} />
          <Text>
            <div>
              <h5 onClick={() => navigate(`/user/${userPostId}`)}>{userName}</h5>
              {currentPath[1] === "user" && userId === userPostId && (
                <div>
                  <AiOutlineEdit data-test="edit-btn" onClick={handleEdit} />
                  <AiFillDelete onClick={() => setModal((curr) => !curr)} />
                </div>
              )}
            </div>
            {isEditing ? (
              <textarea
                data-text="edit-input"
                placeholder=""
                name={"description"}
                value={form.description}
                onChange={handleForm}
                onKeyDown={handleKeyDown}
                ref={editInputRef}
                disabled={!isEditing}
                autoFocus
              />
            ) : (
              <h6>{formatHashtags(description)}</h6>
            )}
          </Text>

          <a href={metaData.url} target="_blank" rel="noreferrer">
            <Main>
              <Block data-test="link">
                <h5>{metaData.title}</h5>
                <h6>{metaData.description}</h6>
                <p>{metaData.url}</p>
              </Block>
              <ImageLink image={metaData.images[0]} />
            </Main>
          </a>
        </Section>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #171717;
  max-width: 611px;
  height: 276px;

  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 16px;

  position: relative;
  display: flex;
  justify-content: center;
  @media (max-width: 719px) {
    width: 100%;
  }
`;

const Header = styled.div`
  width: 67px;
  height: 200px;
  display: flex;
`;

const Imagem = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 10px;

  textarea {
    background: #efefef;
    border-radius: 5px;
    border: none;
    resize: none;
    display: flex;
    flex-wrap: wrap;
  }

  span {
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div div {
    display: flex;
    gap: 12px;
  }
  div div svg {
    font-size: 20px;
    cursor: pointer;
  }
  h5 {
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 7px;
    font-size: 19px;
    line-height: 23px;
    color: #fff;
  }
  h6 {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
  }
`;
const Main = styled.div`
  display: flex;

  margin: 0 auto;
  max-width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  @media (max-width: 719px) {
    width: 90%;
  }
`;

const Block = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  h5 {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;

    margin-bottom: 5px;
  }

  h6 {
    letter-spacing: 0.5px;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 5px;
  }

  p {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }
`;

const ImageLink = styled.div`
  width: 40vw;
  height: 100%;

  border-radius: 0px 9px 9px 0px;
  background-size: cover;
  background-image: url(${(props) => props.image});
  background-position: center center;
`;

const Aside = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-right: 8px;
`;
const Article = styled.div`
  div {
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
  }
`;
const Section = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;
