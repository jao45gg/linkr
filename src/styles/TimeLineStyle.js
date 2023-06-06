import styled from "styled-components";

export const Container = styled.div`
  max-width: 660px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Titulo = styled.div`
  margin-bottom: 20px;

  p {
    font-size: 43px;
    line-height: 64px;
    color: #fff;
  }
`;

export const Posts = styled.div`
  width: 100%;
`;

export const Aside = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Publish = styled.div`
  width: 611px;
  height: calc(200px + 30px + 30px);
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  margin: 15px auto;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
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
`;

export const Block = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  width: 80%;
  margin-right: 20px;

  h5 {
    font-size: 20px;
    font-weight: 200;
    color: #707070;
    padding: 20px 0px;
  }

  textarea {
    width: 90%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    resize: none;
    display: flex;
    flex-wrap: wrap;
    background: #efefef;
  }

  textarea::placeholder {
    font-weight: 300;
    font-size: 15px;
    color: #949494;
  }
`;

export const Input = styled.input`
  width: 90%;
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
`;

export const Button = styled.button`
  width: 112px;
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
