import styled from "styled-components";

export const ResponsiveContainer = styled.div`
  margin-top: 53px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 719px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 920px) {
    width: 100%;
    align-items: center;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
  width: 100%;
`;
export const Sidebar = styled.div`
  width: 301px;
  display: none;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: block;
  }
  div {
    width: 100%;
    padding: 30px 0;
    background: #171717;
    border-radius: 16px;
  }
  div h3 {
    border-bottom: 1px solid #484848;
    width: 100%;
    height: 40px;
    padding: 0px 20px;
    padding-bottom: 9px;

    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    color: #ffffff;
  }
  div ul {
    width: 100%;
    box-sizing: border-box;

    margin: 9px 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      padding: 9px 20px;

      box-sizing: border-box;
      font-family: "Lato";
      font-weight: 700;
      font-size: 19px;
      line-height: 23px;
      letter-spacing: 0.05em;

      color: #ffffff;
    }
    li:before {
      content: "# ";
    }

    li:hover {
      background: #353535;
      border-radius: 8px;
    }
  }
`;
