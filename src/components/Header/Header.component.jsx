import React from 'react';
import { IoLogoYoutube } from 'react-icons/io5';

import Searchbar from '../Searchbar';
import UserImage from '../UserImage';
import {
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  Logo,
  MenuHamburger,
} from './Header.styles';

const Header = ({ isMenuExpanded, onToggleMenu }) => {
  const toggleMenu = () => {
    onToggleMenu();
  };

  return (
    <HeaderContainer data-testid="header">
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
    </HeaderContainer>
  );
};

export default Header;
