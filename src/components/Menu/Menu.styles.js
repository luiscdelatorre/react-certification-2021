import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../config/colors';
import device from '../../config/device';

const MenuContainer = styled.nav`
  grid-area: menu;
  background-color: ${(props) => props.theme.menuBackground};
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  @media ${device.laptop} {
    border-top: 0;
    border-right: 1px solid ${(props) => props.theme.borderColor};
    padding: 2rem;
  }
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-around;
  height: 100%;
  @media ${device.laptop} {
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    height: auto;
  }
`;

const MenuItem = styled.li`
  color: ${(props) => props.theme.textSecondary};
  padding: 0.5rem;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 0;
  @media ${device.laptop} {
    width: 100%;
  }
`;

const MenuLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;

  &[disabled] {
    cursor: not-allowed;
  }

  &::before {
    content: '';
    background-color: transparent;
    border-radius: ${(props) => props.theme.borderRadiusLg};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    transition: ${(props) => props.theme.transitionDefault};
  }

  &:hover:not(.active) {
    color: ${colors.gray100};
    &::before {
      background-color: ${(props) => props.theme.primary};
      animation-name: menu-button-animation;
      animation-timing-function: ease-in;
      animation-duration: 300ms;
    }
  }
  &.active {
    color: ${colors.gray100};
    &::before {
      background-color: ${(props) => props.theme.primary};
    }
  }
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  @media ${device.laptop} {
    flex-direction: ${(props) => (props.isExpanded ? 'row' : 'column')};
    justify-content: ${(props) => (props.isExpanded ? 'flex-start' : 'space-around')};
    padding: ${(props) => (props.isExpanded ? '1.5rem' : '0')};
  }
  ${MenuItem}:hover & {
    color: ${(props) => props.theme.white};
  }
  span {
    display: inline-block;
    font-size: 1rem;
    @media ${device.laptop} {
      font-size: ${(props) => (props.isExpanded ? '1.4rem' : '1rem')};
      margin-left: ${(props) => (props.isExpanded ? '2rem' : '0')};
    }
  }
`;

export { MenuContainer, MenuList, MenuItem, MenuLink, MenuIcon };
