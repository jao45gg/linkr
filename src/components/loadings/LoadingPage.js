import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingPage = () => {
    return (
        <Div>
            <RotatingLines strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true} />
        </Div>
    );
};

export default LoadingPage;

const Div = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    margin-top: 100px;
`