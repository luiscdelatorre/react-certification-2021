import React from 'react';
import {
  IoEnterOutline,
  IoExitOutline,
  IoFlame,
  IoHeart,
  IoHomeOutline,
} from 'react-icons/io5';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../../providers/Auth';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import Styled from './Menu.styles';

const Menu = () => {
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const { state } = useSessionData();
  const location = useLocation();

  const deAuthenticate = (event) => {
    event.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <Styled.Menu data-testid="menu">
      <Styled.MenuList>
        <Styled.MenuItem>
          <Styled.MenuLink to="/" exact>
            <Styled.MenuIcon isExpanded={!state.menuCompact}>
              <IoHomeOutline />
              <span>Home</span>
            </Styled.MenuIcon>
          </Styled.MenuLink>
        </Styled.MenuItem>
        <Styled.MenuItem>
          <Styled.MenuLink to="/trending" exact>
            <Styled.MenuIcon isExpanded={!state.menuCompact}>
              <IoFlame />
              <span>Trending</span>
            </Styled.MenuIcon>
          </Styled.MenuLink>
        </Styled.MenuItem>
        {authenticated && (
          <Styled.MenuItem>
            <Styled.MenuLink to="/favorites">
              <Styled.MenuIcon isExpanded={!state.menuCompact}>
                <IoHeart />
                <span>Favorites</span>
              </Styled.MenuIcon>
            </Styled.MenuLink>
          </Styled.MenuItem>
        )}
        <Styled.MenuItem>
          {authenticated ? (
            <Styled.MenuLink
              to="/login"
              exact
              onClick={deAuthenticate}
              data-testid="button-logout"
            >
              <Styled.MenuIcon isExpanded={!state.menuCompact}>
                <IoExitOutline />
                <span>Logout</span>
              </Styled.MenuIcon>
            </Styled.MenuLink>
          ) : (
            <Styled.MenuLink
              to={{
                pathname: '/login',
                state: { background: location },
              }}
              exact
            >
              <Styled.MenuIcon isExpanded={!state.menuCompact}>
                <IoEnterOutline />
                <span>Login</span>
              </Styled.MenuIcon>
            </Styled.MenuLink>
          )}
        </Styled.MenuItem>
      </Styled.MenuList>
    </Styled.Menu>
  );
};

export default Menu;
