import "./index.css";
import styled from "styled-components";

const LayoutBar = styled.main`
  position: fixed;
  width: 100%;
  height: 72px;
  left: 0px;
  top: 0px;
  background: #151515;
`;

import PropTypes from "prop-types";

const Layout = ({ context }) => {
  return (
    <LayoutBar>
      {/* Aqui você pode renderizar o componente desejado */}
      {context}
    </LayoutBar>
  );
};

Layout.propTypes = {
  context: PropTypes.any.isRequired,
};

export default Layout;
