import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "../api/axios"
import { AiOutlineHeart } from 'react-icons/ai';

export default function Post({ id, link, description, userId, likes, picture, userName }) {

    const [metaData, setMetaData] = useState()

    useEffect(() => {
        axios.get(`https://jsonlink.io/api/extract?url=${link}`)
            .then(response => {
                setMetaData(response.data) // faça o que quiser com os metadados
            })
            .catch(error => {
                console.error('Erro ao obter os metadados da URL:', error);
            });
    }, [])

    return (
        <Container>
            <Header>
                <Aside>
                    <Imagem picture={picture} />
                    <AiOutlineHeart style={{fontSize:'30px', color:'#ffffff'}} />
                </Aside>
            </Header>

            {
                metaData !== undefined &&
                <a href={metaData.url} target="_blank">
                    <Section>
                        <Text>
                            <h1>{userName}</h1>
                            <h2>{description}</h2>
                        </Text>
                        <Main>
                            <Block>
                                <h1>{metaData.title}</h1>
                                <h2>{metaData.description}</h2>
                                <p>{metaData.url}</p>
                            </Block>

                            <ImageLink image={metaData.images[0]} />

                        </Main>
                    </Section>
                </a>
            }

        </Container>
    )
}

const Container = styled.div`
    
    background-color: #171717;;
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

`

const Header = styled.div`
    width: 60px;
    height: 200px;
    display: flex;
    margin-right: 8px;
`

const Imagem = styled.div`
    
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background-size: cover;
    background-image: url(${props => props.picture});
    background-position: center center;

`

const Text = styled.div`
    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 10px;
    
    h1{
        padding-top: 10px;
        padding-bottom: 7px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }

    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;

        color: #B7B7B7;
    }


`
const Main = styled.div`
    border: 1px solid #FFFFFF;
    margin-top: 40px;
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    display: flex;
   
    margin: 0 auto;
    @media (max-width: 719px) {
    width: 90%;
   

  }


`

const Block = styled.div`
    
    width: 100%;
    height: 100%;

    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;

        margin-bottom: 5px;
    }

    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 5px;
    }

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;

        color: #CECECE;
    }

    

`

const ImageLink = styled.div`

    width: 40vw;
    height: 100%;

    border-radius: 0px 12px 13px 0px;
    background-size: cover;
    background-image: url(${props => props.image});
    background-position: center center;

`

const Aside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 60px;
    height: 100%;
    

`
const Section = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;
   

`