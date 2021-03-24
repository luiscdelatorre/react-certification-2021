import styled from 'styled-components';

const OptionsList = styled.ul`
  background-color: ${(props) => props.theme.cardOptions};
  color: ${(props) => props.theme.optionIcon};
  position: absolute;
  top: 0;
  bottom: 0;
  right: -6rem;
  width: 6rem;
  z-index: 0;
`;

const Option = styled.button`
  color: ${(props) => props.theme.cardOption};
  transition: ${(props) => props.theme.transitionFast};
  font-size: 2rem;
  padding: 2rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Styled = {
  OptionsList,
  Option,
};

export default Styled;
