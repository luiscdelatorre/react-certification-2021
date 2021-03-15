import React, { useState } from 'react';
import { IoLogoYoutube } from 'react-icons/io5';
import Menu from '../Menu';
import Searchbar from '../Searchbar';
import UserImage from '../UserImage';
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderCenter,
  MainContent,
  MenuHamburger,
  Logo,
} from './Layout.styles';

const Layout = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <Container isMenuExpanded={isMenuExpanded}>
      <Header data-testid="header">
        <HeaderLeft>
          <MenuHamburger
            isMenuExpanded={isMenuExpanded}
            onClick={toggleMenu}
            data-testid="button-menu"
          />
          <Logo to="/">
            <IoLogoYoutube />
            <span>YuTuv</span>
          </Logo>
        </HeaderLeft>
        <HeaderCenter>
          <Searchbar />
        </HeaderCenter>
        <HeaderRight>
          <UserImage />
        </HeaderRight>
      </Header>
      <Menu isExpanded={isMenuExpanded} />
      <MainContent data-testid="main-content">{children}</MainContent>
    </Container>
  );
};

export default Layout;
