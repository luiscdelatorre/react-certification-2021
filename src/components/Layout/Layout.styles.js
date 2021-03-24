import styled from 'styled-components';
import device from '../../config/device';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'menu';
  grid-template-rows: 8rem auto 7rem;

  @media ${device.laptop} {
    grid-template-areas:
      'header header'
      'menu content';
    grid-template-rows: 9rem auto;
    grid-template-columns: ${(props) => (props.isMenuExpanded ? '20rem' : '9rem')} auto;
  }
`;

const MainContent = styled.main`
  grid-area: content;
  background-color: ${(props) => props.theme.background};
  overflow-y: auto;
`;

const Styled = { Container, MainContent };
export default Styled;
