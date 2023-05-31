import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "../api/axios"

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
                <Imagem />
                <Text>
                    <h1>{userName}</h1>
                    <h2>{description}</h2>
                </Text>
                <a href={metaData.url} target="_blank">
                    <Main>
                        {
                            metaData !== undefined &&
                            <>
                                <Block>
                                    <h1>{metaData.title}</h1>
                                    <h2>{metaData.description}</h2>
                                    <p>{metaData.url}</p>
                                </Block>

                                <ImageLink image={metaData.images[0]} />
                            </>

                        }

                    </Main>
                </a>

            </Header>
        </Container>
    )
}

const Container = styled.div`
    
    background-color: #171717;;
    width: 100%;
    height: 30vh;

    margin-bottom: 15px;

    border-radius: 16px;

    position: relative;
`

const Header = styled.div`
   

    width: 100%;

    position: relative;
`

const Imagem = styled.div`
    
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    position: absolute;
    left: 15px;
    top: 10px;
    background-size: cover;
    background-image: url("https://t.ctcdn.com.br/5XPASDBUosgmBv5Ptpxcd6eTJso=/512x288/smart/filters:format(webp)/i257652.jpeg");
    background-position: center center;
`

const Text = styled.div`
    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    margin-top: 20px;
    margin-left: 100px;

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

    width: 35vw;
    height: 150px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    position: absolute;
    top:10vh;
    left: 8vw;

    display: flex;
    align-items: center;

`

const Block = styled.div`
    
    width: 70vw;
    height: 100%;
   
    margin-top: 25px;
    margin-left: 20px;

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