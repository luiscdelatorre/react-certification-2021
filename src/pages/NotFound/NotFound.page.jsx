import React from 'react';
import { IoArrowUndo } from 'react-icons/io5';
import { Container, HomeLink, ButtonContainer, NotFoundImage } from './NotFound.styles';
import cheems from '../../assets/img/404.png';

const NotFoundPage = () => {
  const title = `Uh oh! :(`;
  const message = `This page doesn't exist or the server has amxiety.`;
  const buttonMessage = `Try again later or `;

  return (
    <Container>
      <h1>{title}</h1>
      <NotFoundImage src={cheems} alt="page not found" />
      <h2>{message}</h2>
      <ButtonContainer>
        <h4>{buttonMessage}</h4>
        <HomeLink to="/">
          <IoArrowUndo />
          Back to Home
        </HomeLink>
      </ButtonContainer>
    </Container>
  );
};

export default NotFoundPage;
