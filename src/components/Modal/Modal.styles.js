import styled from 'styled-components';
import device from '../../config/device';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 60%);
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  animation-timing-function: ease;
  animation-duration: 300ms;
  animation-fill-mode: forwards;

  animation-name: ${({ state }) => {
    switch (state) {
      case 'entering':
        return 'popup-animation-enter';
      case 'exiting':
        return 'popup-animation-exit';
      default:
        return '';
    }
  }};
  width: 100%;
  max-width: 40rem;
  padding: 2rem;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: ${(props) => props.theme.borderRadiusLg};
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  padding-right: 4rem;
  @media ${device.tablet} {
    font-size: 3.2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  svg {
    font-size: 2rem;
  }
`;

const Styled = {
  Modal,
  Backdrop,
  Container,
  Title,
  CloseButton,
};

export default Styled;
