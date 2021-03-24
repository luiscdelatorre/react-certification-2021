import React from 'react';
import { IoArrowUndo } from 'react-icons/io5';
import Styled from './NotFound.styles';
import cheems from '../../assets/img/404.png';

const NotFoundPage = () => {
  return (
    <Styled.Container>
      <h1>Uh oh! :(</h1>
      <Styled.NotFoundImage src={cheems} alt="page not found" />
      <h2>This page doesn&apos;t exist or the server has amxiety.</h2>
      <Styled.ButtonContainer>
        <h4>Try again later or </h4>
        <Styled.HomeLink to="/">
          <IoArrowUndo />
          Back to Home
        </Styled.HomeLink>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default NotFoundPage;
