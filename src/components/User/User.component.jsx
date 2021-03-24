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
import { useHistory, useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useAuth } from '../../providers/Auth';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import Popup from '../Popup';
import Styled from './User.styles';

const User = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const { state, setTheme } = useSessionData();
  const location = useLocation();

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
      <Styled.UserImage
        type="button"
        onClick={() => toggleUserMenu(!showMenu)}
        data-testid="user-default-icon"
      >
        {authenticated && state.user ? (
          <img src={state.user?.avatarUrl} alt="user" data-testid="user-image" />
        ) : (
          <>
            <span />
            <IoPersonCircle />
          </>
        )}
      </Styled.UserImage>
      <Popup data-testid="user-popup" visible={showMenu} onClose={toggleUserMenu}>
        <Transition
          in={!showSubMenu}
          mountOnEnter
          unmountOnExit
          timeout={400}
          nodeRef={menuRef}
        >
          {(transitionState) => (
            <Styled.Container data-testid="menu" ref={menuRef} state={transitionState}>
              <Styled.Header>
                <h4>Hello {authenticated ? state.user?.name : 'Stranger'}!</h4>
                <Styled.CloseButton
                  type="button"
                  onClick={() => toggleUserMenu(false)}
                  data-testid="button-close"
                />
              </Styled.Header>
              <Styled.Content>
                <Styled.OptionsList>
                  <Styled.OptionsListItem>
                    <Styled.OptionsButton
                      type="button"
                      data-testid="button-themes"
                      onClick={() => toggleSubMenu(true)}
                    >
                      <IoColorPaletteOutline /> <span>Theme</span>
                    </Styled.OptionsButton>
                  </Styled.OptionsListItem>
                  {authenticated ? (
                    <Styled.OptionsListItem>
                      <Styled.OptionsLink
                        to="/"
                        onClick={deAuthenticate}
                        data-testid="button-logout"
                      >
                        <IoExitOutline />
                        <span>Logout</span>
                      </Styled.OptionsLink>
                    </Styled.OptionsListItem>
                  ) : (
                    <Styled.OptionsListItem>
                      <Styled.OptionsLink
                        to={{
                          pathname: '/login',
                          state: { background: location },
                        }}
                        onClick={() => toggleUserMenu(false)}
                        data-testid="link-login"
                      >
                        <IoEnterOutline />
                        <span>Login</span>
                      </Styled.OptionsLink>
                    </Styled.OptionsListItem>
                  )}
                </Styled.OptionsList>
              </Styled.Content>
            </Styled.Container>
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
            <Styled.Container
              data-testid="submenu"
              ref={subMenuRef}
              state={transitionState}
            >
              <Styled.Header>
                <h4>
                  <Styled.HeaderButton
                    data-testid="button-submenu-back"
                    type="button"
                    onClick={() => toggleSubMenu(false)}
                  >
                    <IoArrowBack />
                    Theme
                  </Styled.HeaderButton>
                </h4>
                <Styled.CloseButton
                  type="button"
                  onClick={() => toggleUserMenu(false)}
                  data-testid="button-submenu-close"
                />
              </Styled.Header>
              <Styled.Content>
                <Styled.OptionsList>
                  <Styled.OptionsListItem>
                    <Styled.OptionsButton
                      data-testid="button-theme-system"
                      type="button"
                      onClick={() => setCurrentTheme('System')}
                    >
                      <IoSettingsOutline /> <span>System Default</span>
                      {state.theme === 'System' && <Styled.ActiveTheme />}
                    </Styled.OptionsButton>
                  </Styled.OptionsListItem>
                  <Styled.OptionsListItem>
                    <Styled.OptionsButton
                      data-testid="button-theme-dark"
                      type="button"
                      onClick={() => setCurrentTheme('Dark')}
                    >
                      <IoMoonOutline /> <span>Dark</span>
                      {state.theme === 'Dark' && <Styled.ActiveTheme />}
                    </Styled.OptionsButton>
                  </Styled.OptionsListItem>
                  <Styled.OptionsListItem>
                    <Styled.OptionsButton
                      data-testid="button-theme-light"
                      type="button"
                      onClick={() => setCurrentTheme('Light')}
                    >
                      <IoSunnyOutline /> <span>Light</span>
                      {state.theme === 'Light' && <Styled.ActiveTheme />}
                    </Styled.OptionsButton>
                  </Styled.OptionsListItem>
                </Styled.OptionsList>
              </Styled.Content>
            </Styled.Container>
          )}
        </Transition>
      </Popup>
    </>
  );
};

export default User;
