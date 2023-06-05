import styled from "styled-components";

export const Container = styled.div`
  max-width: 660px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

export const Titulo = styled.div`
  margin-bottom: 20px;

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    /* identical to box height */
    color: #ffffff;
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
  height: 300px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 10px;
  position: relative;

  margin: 10px auto;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 10px auto;
  }
`;

export const Imagem = styled.div`
  background-color: lightcoral;
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background: url(${(props) => props.picture});
  background-size: cover;
  background-position: center center;

  position: absolute;
  left: 15px;
  top: 20px;
`;

export const Block = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  width: 80%;
  margin-right: 20px;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 5px;
    padding-top: 20px;
  }

  textarea {
    background: #efefef;
    border-radius: 5px;
    border: none;
    resize: none;
    display: flex;
    flex-wrap: wrap;

    width: 90%;
    height: 100px;
  }

  textarea::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */
    padding-top: 8px;
    padding-left: 7px;

    color: #949494;
  }
`;

export const Input = styled.input`
  width: 90%;
  height: 30px;

  background: #efefef;
  border-radius: 5px;
  border: none;

  margin-bottom: 10px;

  ::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */
    padding-top: 8px;
    padding-left: 7px;

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
  top: 120%;
  right: 10%;
  transform: translateY(-50%);

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    color: #ffffff;

    margin-top: -10px;
  }
`;
