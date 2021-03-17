import React, { useRef, useState } from 'react';
import {
  IoEnterOutline,
  IoExitOutline,
  IoColorPaletteOutline,
  IoPersonCircle,
  IoArrowBack,
  IoMoonOutline,
  IoSunnyOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useAuth } from '../../providers/Auth';
import { useOptions } from '../../providers/Options/Options.provider';
import Popup from '../Popup';
import {
  Container,
  Header,
  Content,
  OptionsList,
  OptionsListItem,
  OptionsLink,
  OptionsButton,
  CloseButton,
  UserImage,
  HeaderButton,
  ActiveTheme,
} from './User.styles';

const User = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const { state, setTheme } = useOptions();

  const toggleUserMenu = (value) => {
    setShowMenu(value);
    setTimeout(() => {
      setShowSubMenu(false);
    }, 200);
  };

  const toggleSubMenu = (value) => {
    setShowSubMenu(value);
  };

  const deAuthenticate = (event) => {
    event.preventDefault();
    toggleUserMenu(false);
    logout();
    history.push('/');
  };

  const setCurrentTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <>
      <UserImage
        type="button"
        onClick={() => toggleUserMenu(!showMenu)}
        data-testid="user-default-icon"
      >
        <IoPersonCircle />
      </UserImage>
      <Popup data-testid="user-popup" visible={showMenu} onClose={toggleUserMenu}>
        <Transition
          in={!showSubMenu}
          mountOnEnter
          unmountOnExit
          timeout={400}
          nodeRef={menuRef}
        >
          {(transitionState) => (
            <Container data-testid="menu" ref={menuRef} state={transitionState}>
              <Header>
                <h4>{authenticated ? 'Username' : 'Hello Stranger!'}</h4>
                <CloseButton
                  type="button"
                  onClick={() => toggleUserMenu(false)}
                  data-testid="button-close"
                />
              </Header>
              <Content>
                <OptionsList>
                  <OptionsListItem>
                    <OptionsButton
                      type="button"
                      data-testid="button-themes"
                      onClick={() => toggleSubMenu(true)}
                    >
                      <IoColorPaletteOutline /> <span>Theme</span>
                    </OptionsButton>
                  </OptionsListItem>
                  {authenticated ? (
                    <OptionsListItem>
                      <OptionsLink
                        to="/"
                        onClick={deAuthenticate}
                        data-testid="button-logout"
                      >
                        <IoExitOutline />
                        <span>Logout</span>
                      </OptionsLink>
                    </OptionsListItem>
                  ) : (
                    <OptionsListItem>
                      <OptionsLink
                        to="/login"
                        onClick={() => toggleUserMenu(false)}
                        data-testid="link-login"
                      >
                        <IoEnterOutline />
                        <span>Login</span>
                      </OptionsLink>
                    </OptionsListItem>
                  )}
                </OptionsList>
              </Content>
            </Container>
          )}
        </Transition>
        <Transition
          in={showSubMenu}
          mountOnEnter
          unmountOnExit
          timeout={400}
          nodeRef={subMenuRef}
        >
          {(transitionState) => (
            <Container data-testid="submenu" ref={subMenuRef} state={transitionState}>
              <Header>
                <h4>
                  <HeaderButton
                    data-testid="button-submenu-back"
                    type="button"
                    onClick={() => toggleSubMenu(false)}
                  >
                    <IoArrowBack />
                    Theme
                  </HeaderButton>
                </h4>
                <CloseButton
                  type="button"
                  onClick={() => toggleUserMenu(false)}
                  data-testid="button-submenu-close"
                />
              </Header>
              <Content>
                <OptionsList>
                  <OptionsListItem>
                    <OptionsButton
                      data-testid="button-theme-system"
                      type="button"
                      onClick={() => setCurrentTheme('System')}
                    >
                      <IoSettingsOutline /> <span>System Default</span>
                      {state.theme === 'System' && <ActiveTheme />}
                    </OptionsButton>
                  </OptionsListItem>
                  <OptionsListItem>
                    <OptionsButton
                      data-testid="button-theme-dark"
                      type="button"
                      onClick={() => setCurrentTheme('Dark')}
                    >
                      <IoMoonOutline /> <span>Dark</span>
                      {state.theme === 'Dark' && <ActiveTheme />}
                    </OptionsButton>
                  </OptionsListItem>
                  <OptionsListItem>
                    <OptionsButton
                      data-testid="button-theme-light"
                      type="button"
                      onClick={() => setCurrentTheme('Light')}
                    >
                      <IoSunnyOutline /> <span>Light</span>
                      {state.theme === 'Light' && <ActiveTheme />}
                    </OptionsButton>
                  </OptionsListItem>
                </OptionsList>
              </Content>
            </Container>
          )}
        </Transition>
      </Popup>
    </>
  );
};

export default User;
