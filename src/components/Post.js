import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart, AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";
// import Modal from "./feed/Modal.js";

export default function Post({
  id,
  link,
  description,
  userId,
  likes,
  picture,
  userName,
  liked,
  RefreshDataLikes,
  RefreshTimeline,
  userPostId,
}) {
  const [metaData, setMetaData] = useState();
  const [isLike, setIsLike] = useState(false);
  const [people, setPeople] = useState();
  // const [modal, setModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonlink.io/api/extract?url=${link}`)
      .then((response) => {
        setMetaData(response.data); // faça o que quiser com os metadados
      })
      .catch((error) => {
        console.error("Erro ao obter os metadados da URL:", error);
      });

    const promise = axiosPrivate.get(`/posts/liked/${id}`);
    promise.then((res) => setPeople(res.data));
    promise.catch((err) => console.log(err));
  }, [axiosPrivate, id, link]);

  const toggleIcon = (id, type) => {
    setIsLike(!isLike);

    if (type === true) {
      const promise = axiosPrivate.post(`/posts/likes/${id}`);
      promise.then(() => {
        RefreshDataLikes();
        RefreshTimeline();
        const promise = axiosPrivate.get(`/posts/liked/${id}`);
        promise.then((res) => setPeople(res.data));
        promise.catch((err) => console.log(err));
      });
      promise.catch((err) => console.log(err));
    } else {
      const promise2 = axiosPrivate.post(`/posts/disliked/${id}`);
      promise2.then(() => {
        RefreshDataLikes();
        RefreshTimeline();
        const promise = axiosPrivate.get(`/posts/liked/${id}`);
        promise.then((res) => setPeople(res.data));
        promise.catch((err) => console.log(err));
      });
      promise2.catch((err) => console.log(err));
    }
  };

  const getTooltipContent = () => {
    if (people && people.length > 0) {
      const currentUser = people.some((item) => item.user_id === userId);
      const otherPeople = people.filter((item) => item.user_id !== userId);

      if (currentUser) {
        const aleatoryNumber = Math.floor(Math.random() * otherPeople.length);
        if (people.length - 2 === 1) {
          return `Você, ${otherPeople[aleatoryNumber].user_name} e outra pessoa`;
        }
      }
    }
  };

  //   const getTooltipContent = () => {
  //       if (people && people.length > 0) {
  //           const currentUser = people.some(item => item.user_id === userId)
  //           const otherPeople = people.filter(item => item.user_id !== userId)

  //           if (currentUser) {
  //               const aleatoryNumber = Math.floor(Math.random() * otherPeople.length)
  //               if (people.length - 2 === 1) {
  //                   return `Você, ${otherPeople[aleatoryNumber]?.user_name} e outra pessoa`;
  //               }
  //               return `Você, ${otherPeople[aleatoryNumber]?.user_name} e outras ${people.length - 2} pessoas`;
  //           } else {
  //               if (people.length - 2 === 0) {
  //                   return `${people[people.length - 1]?.user_name} e ${people[people.length - 2]?.user_name}`;
  //               }
  //               return `${people[people.length - 1]?.user_name}, ${people[people.length - 2]?.user_name} e ${people.length - 2} pessoas`;
  //           }
  //       }
  //       return `${people[people.length - 1].user_name}, ${
  //         people[people.length - 2].user_name
  //       } e ${people.length - 2} pessoas`;
  //     }
  //   }
  //   return ""; // Retorna uma string vazia caso people seja undefined
  // };

  return (
    <Container>
      <Header>
        <Aside>
          <Imagem onClick={() => navigate(`/user/${userPostId}`)} picture={picture} />
          <Article>
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
            <div data-tooltip-content={getTooltipContent()} data-tooltip-id="example">
              {likes !== 0 && `${likes} likes`}
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
        </Aside>
      </Header>

      {metaData !== undefined && (
        <Section>
          {/* <Modal modal={modal} setModal={setModal} id={id} /> */}
          <Text>
            <div>
              <h1 onClick={() => navigate(`/user/${userPostId}`)}>{userName}</h1>
              <div>
                <AiOutlineEdit />
                <AiFillDelete />
                {/* <AiFillDelete onClick={() => setModal((curr) => !curr)} /> */}
              </div>
            </div>
            <h2>{description}</h2>
          </Text>
          <a href={metaData.url} target="_blank" rel="noreferrer">
            <Main>
              <Block>
                <h1>{metaData.title}</h1>
                <h2>{metaData.description}</h2>
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
  width: 611px;
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
  width: 60px;
  height: 200px;
  display: flex;
  margin-right: 8px;
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

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  div div {
    display: flex;
    gap: 12px;
    color: #fff;
  }
  div div svg {
    font-size: 20px;
    cursor: pointer;
  }
  h1,
  h2 {
    color: #fff;
  }
  h1 {
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 7px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
  }

  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #b7b7b7;
  }
`;
const Main = styled.div`
  border: 1px solid #ffffff;
  margin-top: 40px;
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  display: flex;

  margin: 0 auto;
  @media (max-width: 719px) {
    width: 90%;
  }
`;

const Block = styled.div`
  width: 100%;
  height: 100%;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;

    margin-bottom: 5px;
  }

  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 5px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    color: #cecece;
  }
`;

const ImageLink = styled.div`
  width: 40vw;
  height: 100%;

  border-radius: 0px 12px 13px 0px;
  background-size: cover;
  background-image: url(${(props) => props.image});
  background-position: center center;
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60px;
  height: 100%;
  margin-left: 10px;
`;
const Article = styled.div`
  div {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
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
