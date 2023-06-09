import styled from "styled-components";

export const Container = styled.div`
  max-width: 660px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: 719px) {
    padding: 0;
  }
`;

export const Titulo = styled.div`
  position: absolute;
  left: 50.2%;
  transform: translateX(-49%);
  max-width: calc(611px + 25px + 301px);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 53px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;

    p {
      font-size: 43px;
      line-height: 64px;
      color: #fff;
    }
  }

  div:last-child button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }

  div:last-child button:hover {
    filter: brightness(0.9);
  }

  div:last-child button.following {
    background: #1877f2;
    color: #fff;
  }

  div:last-child button.not-following {
    background: #fff;
    color: #1877f2;
  }

  @media (max-width: 719px) {
    margin-top: 0px;
  }
`;

export const Posts = styled.div`
  margin-top: calc(53px + 20px + 64px);


  width: 100%;
  @media (max-width: 719px) {
    margin-top: calc(20px + 64px);
  }
`;

export const Aside = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Publish = styled.div`
  max-width: 611px;
  height: calc(200px + 30px + 30px);
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  margin: 15px auto;

  @media (max-width: 719px) {
    display: flex;
    justify-content: space-around;
    border-radius: 0;
    height: 36dvh;
  }
`;

export const Imagem = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${(props) => props.picture});
  background-size: cover;
  background-position: center center;

  position: absolute;
  left: 20px;
  top: 20px;

  @media (max-width: 719px) {
    width: 0;
    height: 0;
    display: none;
  }
`;

export const Block = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  width: 80%;
  margin-right: 20px;

  h5 {
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    font-size: 20px;
    font-weight: 200;
    color: #707070;
    padding: 20px 0px;
    @media (max-width: 719px) {
      font-size: 2.3dvh;
    }
  }

  textarea {
    width: min(90%, 62vw);
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    resize: none;
    display: flex;
    flex-wrap: wrap;
    background: #efefef;

    @media (max-width: 719px) {
      width: 90%;
      height: 8dvh;
      font-size: 2dvh;
    }
    
  }

  textarea::placeholder {
    font-weight: 300;
    font-size: 15px;
    color: #949494;
  }

  @media (max-width: 719px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    width: 100dvw;
    height: 100%;
  }
`;

export const Input = styled.input`
  width: min(90%, 62vw);
  height: 30px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  background: #efefef;
  ::placeholder {
    font-weight: 300;
    font-size: 15px;
    color: #949494;
  }
  @media (max-width: 719px) {
      width: 90%;
      height: 5dvh;
      font-size: 2dvh;
    }
`;

export const Button = styled.button`
  max-width: 112px;
  height: 30px;

  background: #1877f2;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 111%;
  right: 10%;
  transform: translateY(-50%);
  @media (max-width: 719px) {
    height: 22px;
    width: 112px;
    margin: 0;
    transform: 0;
    top: 31dvh;
    right: 5.4dvw;
  }
  p {
    font-weight: 500;
    letter-spacing: 0.05em;
    font-size: 14px;
    color: #fff;
  }
  :hover {
    background: #3a5ad6;
  }
`;
