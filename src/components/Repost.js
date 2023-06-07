import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineComment,
} from "react-icons/ai";
import { FaRetweet } from "react-icons/fa"
import { Tooltip } from "react-tooltip";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./feed/Modal.js";

export default function Repost(id, link) {
 
 
  const [metaData, setMetaData] = useState();
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
  }, [axiosPrivate, id, link]); 

 
  /* const getTooltipContent = () => {
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
      return `Você, ${otherPeople[aleatoryNumber]?.user_name} e outras ${likes.length - 2
        } pessoas`;
    } else {
      if (likes.length - 2 === 0) {
        return `${likes[likes.length - 1]?.user_name} e ${likes[likes.length - 2]?.user_name
          }`;
      } else {
        if (otherPeople.length === 1) {
          return `${likes[likes.length - 1]?.user_name}`;
        }
      }
      return `${likes[likes.length - 1]?.user_name}, ${likes[likes.length - 2]?.user_name
        } e ${likes.length - 2} pessoas`;
    }
  }; */

  /* const formatHashtags = (text) => {
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
  }; */

  return (
    <Container data-test="post">
      <Header>
        <Aside>
         
        </Aside>
      </Header>

      {metaData !== undefined && (
        <Section data-test="post">
          <Text>
            <div>
              {/* <h5 onClick={() => navigate(`/user/${userPostId}`)}>{userName}</h5> */}
            </div>
              {/* <h6>{formatHashtags(description)}</h6> */}
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
  box-sizing: border-box;

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
  height: 100%;
  display: flex;

  margin-right:8px;
  
`;

const Imagem = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-image: url(${(props) => props.picture});
  background-position: center center;

  margin-top: 17px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  
 

  
`;
const Article = styled.div`

  div {
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;

    margin-top: 7px;
  }
`;
const Section = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;
