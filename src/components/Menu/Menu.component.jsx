import React from 'react';
import {
  IoEnterOutline,
  IoExitOutline,
  IoHomeOutline,
  IoOptions,
  IoStar,
} from 'react-icons/io5';
import { useHistory } from 'react-router';
import { useAuth } from '../../providers/Auth';
import { useOptions } from '../../providers/Options/Options.provider';
import { MenuContainer, MenuIcon, MenuItem, MenuLink, MenuList } from './Menu.styles';

const Menu = () => {
  const history = useHistory();
  const { authenticated, logout } = useAuth();
  const { state } = useOptions();

  const deAuthenticate = (event) => {
    event.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <MenuContainer data-testid="menu">
      <MenuList>
        <MenuItem>
          <MenuLink to="/" exact>
            <MenuIcon isExpanded={!state.menuCompact}>
              <IoHomeOutline />
              <span>Home</span>
            </MenuIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem disabled>
          <MenuIcon isExpanded={!state.menuCompact}>
            <IoStar />
            <span>Favorites</span>
          </MenuIcon>
        </MenuItem>
        <MenuItem disabled>
          <MenuIcon isExpanded={!state.menuCompact}>
            <IoOptions />
            <span>Options</span>
          </MenuIcon>
        </MenuItem>
        <MenuItem>
          {authenticated ? (
            <MenuLink
              to="/login"
              exact
              onClick={deAuthenticate}
              data-testid="button-logout"
            >
              <MenuIcon isExpanded={!state.menuCompact}>
                <IoExitOutline />
                <span>Logout</span>
              </MenuIcon>
            </MenuLink>
          ) : (
            <MenuLink to="/login" exact>
              <MenuIcon isExpanded={!state.menuCompact}>
                <IoEnterOutline />
                <span>Login</span>
              </MenuIcon>
            </MenuLink>
          )}
        </MenuItem>
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;
