import { useEffect, useState } from "react"
import styled from "styled-components"
import { getPublish, publish } from "../api/axios"
import Post from "../components/Post"

export default function Timeline() {

    const [form, setForm] = useState({ url: "", description: "" })
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
        const promise = getPublish()
        promise.then(res => setData(res.data))
        promise.catch(err => console.log(err))
    }, [])

    function handleForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function posting(event) {
        event.preventDefault()
        setDisabled(true)

        console.log(form)
        setDisabled(false)

        const promise = publish(form)
        promise.then(res => { setDisabled(false); window.location.reload(); })
        promise.catch(err => { alert("Erro ao publicar seu link"); setDisabled(false) })
    }

    return (
        <Container>
            <Titulo>
                <h1> {"timeline"} </h1>
            </Titulo>

            <Posts>
                <Publish>
                    <Imagem />
                    <form onSubmit={posting} >
                        <Block>
                            <p>{"What are you going to share today?"}</p>
                            <Input type="url"
                                placeholder="http://..."
                                name={"url"}
                                value={form.url}
                                onChange={handleForm}
                                disabled={disabled}
                                required />

                            <textarea placeholder="Awesome article about #javascript"
                                rows={4}
                                cols={58}
                                name={"description"}
                                value={form.description}
                                onChange={handleForm}
                                disabled={disabled} />

                            <Button type="submit" disabled={disabled}>
                                <p>{disabled ? "Publishing..." : "Publish"}</p>
                            </Button>
                        </Block>
                    </form>

                </Publish>
                <Aside>
                    {data !== undefined && data.map(item => <Post key={item.id}
                        id={item.id}
                        link={item.link}
                        description={item.description}
                        userId={item.user_Id}
                        likes={item.likes}
                        picture={item.picture}
                        userName={item.name}
                    />)}
                </Aside>

            </Posts>
        </Container>
    )
}

const Container = styled.div`
    
    background-color: rgba(51,51,51);
    width: 611px;
    height: 90vh;
    margin: 15vh auto;

`

const Titulo = styled.div`
    margin-bottom: 20px;

    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        /* identical to box height */
        color: #FFFFFF;
    }

`

const Posts = styled.div`
    
`

const Aside = styled.div`
     height: calc(55vh - 15vh);
     overflow-y: auto;
     

     
`

const Publish = styled.div`

    width: 100%;
    height: 210px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    position: relative;
    display: flex;

    margin-bottom: 30px;
    
`

const Imagem = styled.div`
    
    background-color: lightcoral;
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    /*passar a imagem como props para background: url(${props => props.image});*/
    position: absolute;
    left: 15px;
    top: 20px;
`

const Block = styled.div`
    margin-top: 20px;
    margin-left: 100px;
    position: relative;

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 5px;
    }

    textarea{
        background: #EFEFEF;
        border-radius: 5px;
        border: none;
        resize: none;
        display: flex;
        flex-wrap:wrap;
    }

    textarea::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */  
        padding-top : 8px;
        padding-left: 7px;

        color: #949494;
    }

`

const Input = styled.input`
    width: 99%;
    height: 30px;

    background: #EFEFEF;
    border-radius: 5px;
    border: none;

    margin-bottom: 10px;

    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        /* identical to box height */
        padding-top : 8px;
        padding-left: 7px;

        color: #949494;

}
`

const Button = styled.button`
    width: 112px;
    height: 31px;

    background: #1877F2;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 120%;
    right: 0;
    transform: translateY(-50%);
    
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */
        color: #FFFFFF;

        margin-top: 5px;
}
`