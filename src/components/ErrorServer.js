import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorServer = ({ message }) => {
  return <Div>{message}</Div>;
};

ErrorServer.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorServer;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #ffffff;
`;