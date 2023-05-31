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
                <Imagem picture={picture}/>
                <Text>
                    <h1>{userName}</h1>
                    <h2>{description}</h2>
                </Text>

                {
                    metaData !== undefined &&
                    <a href={metaData.url} target="_blank">
                        <Main>


                            <>
                                <Block>
                                    <h1>{metaData.title}</h1>
                                    <h2>{metaData.description}</h2>
                                    <p>{metaData.url}</p>
                                </Block>

                                <ImageLink image={metaData.images[0]} />
                            </>
                        </Main>
                    </a>
                }
            </Header>
        </Container>
    )
}

const Container = styled.div`
    
    background-color: #171717;;
    width: 100%;
    height: 400px;

    margin-bottom: 15px;

    border-radius: 16px;

    position: relative;

`

const Header = styled.div`
    width: 100%;

    
`

const Imagem = styled.div`
    
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    position: absolute;
    left: 15px;
    top: 10px;
    background-size: cover;
    background-image: url(${props => props.picture});
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

    margin: 0 auto;
    margin-top: 40px;
    width: 80%;
    height: 200px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    display: flex;
    align-items: center;
    margin-left: 100px;

`

const Block = styled.div`
    
    width: 100%;
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