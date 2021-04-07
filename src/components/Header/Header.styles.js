import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from '../../config/device';

const Header = styled.header`
  grid-area: header;
  background-color: ${(props) => props.theme.menuBackground};
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderLeft = styled(HeaderItem)`
  justify-content: flex-start;
  @media ${device.laptop} {
    flex-basis: 14rem;
  }
`;

const HeaderCenter = styled(HeaderItem)`
  justify-content: flex-end;
  flex: 1;
  @media ${device.laptop} {
    justify-content: center;
  }
`;

const HeaderRight = styled(HeaderItem)`
  justify-content: flex-end;
  @media ${device.laptop} {
    flex-basis: 8rem;
  }
`;

const MenuHamburger = styled.button`
  position: relative;
  background: none;
  display: none;
  padding: 1.5rem 1rem;
  height: 4rem;
  width: 5rem;
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  &:focus,
  &:hover {
    outline: none;
    box-shadow: none;
    &::before,
    &::after {
      background-color: ${(props) => props.theme.menuButtonActive};
    }
  }
  &::before,
  &::after {
    content: '';
    transition: ${(props) => props.theme.transitionFast};
    background-color: ${(props) => props.theme.menuButton};
    width: ${(props) => (props.isMenuExpanded ? '3rem' : '2rem')};
    display: block;
    height: 0.3rem;
  }
  &:active {
    animation-name: '';
  }
`;

const Logo = styled(Link)`
  color: inherit;
  display: inline-flex;
  margin: 0 1rem;
  text-decoration: none;
  align-items: center;
  font-family: 'Cabin Condensed', sans-serif;
  position: relative;
  span {
    font-size: 3.3rem;
  }
  svg {
    color: ${(props) => props.theme.logoPrimary};
    font-size: 3.5rem;
    margin-right: 0.3rem;
    z-index: 1;
  }
  &::before {
    content: '';
    background-color: ${(props) => props.theme.logoSecondary};
    height: 2rem;
    width: 2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 0;
  }
  &::after {
    content: 'React';
    display: block;
    color: ${(props) => props.theme.textSecondary};
    font-size: 1.2rem;
    position: absolute;
    top: 0.1rem;
    right: 0;
  }
`;

const Styled = {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderCenter,
  Logo,
  MenuHamburger,
};
export default Styled;
