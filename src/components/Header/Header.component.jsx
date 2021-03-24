import React from 'react';
import { IoLogoYoutube } from 'react-icons/io5';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';

import Searchbar from '../Searchbar';
import User from '../User';
import Styled from './Header.styles';

const Header = () => {
  const { state, setMenu } = useSessionData();

  const toggleMenu = () => {
    setMenu(!state.menuCompact);
  };

  return (
    <Styled.Header data-testid="header">
      <Styled.HeaderLeft>
        <Styled.MenuHamburger
          isMenuExpanded={!state.menuCompact}
          onClick={toggleMenu}
          data-testid="button-menu"
        />
        <Styled.Logo to="/">
          <IoLogoYoutube />
          <span>YuTuv</span>
        </Styled.Logo>
      </Styled.HeaderLeft>
      <Styled.HeaderCenter>
        <Searchbar />
      </Styled.HeaderCenter>
      <Styled.HeaderRight>
        <User />
      </Styled.HeaderRight>
    </Styled.Header>
  );
};

export default Header;
