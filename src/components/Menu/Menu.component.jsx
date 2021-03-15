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
import { MenuContainer, MenuIcon, MenuItem, MenuLink, MenuList } from './Menu.styles';

const Menu = ({ isExpanded }) => {
  const history = useHistory();
  const { authenticated, logout } = useAuth();

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
            <MenuIcon isExpanded={isExpanded}>
              <IoHomeOutline />
              <span>Home</span>
            </MenuIcon>
          </MenuLink>
        </MenuItem>
        <MenuItem disabled>
          <MenuIcon isExpanded={isExpanded}>
            <IoStar />
            <span>Favorites</span>
          </MenuIcon>
        </MenuItem>
        <MenuItem disabled>
          <MenuIcon isExpanded={isExpanded}>
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
              <MenuIcon isExpanded={isExpanded}>
                <IoExitOutline />
                <span>Logout</span>
              </MenuIcon>
            </MenuLink>
          ) : (
            <MenuLink to="/login" exact>
              <MenuIcon isExpanded={isExpanded}>
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
