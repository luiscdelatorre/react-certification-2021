import styled from 'styled-components';

const VideoData = styled.h5`
  color: ${(props) => props.theme.textSecondary};
  display: inline-block;
  + h5 {
    padding-left: 2rem;
    position: relative;
    &::before {
      content: '•';
      position: absolute;
      left: 0.7rem;
    }
  }
`;

const BroadcastContent = styled.span`
  background-color: ${(props) => props.theme.tagBackground};
  color: ${(props) => props.theme.tagText};
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadiusSm};
  letter-spacing: 0;
  margin: 0;
  text-transform: capitalize;
  line-height: 1.4rem;
  svg {
    vertical-align: bottom;
    font-size: 1.5rem;
    margin-right: 0.2rem;
  }
`;

const ToggleButton = styled.button`
  display: inline-block;
  padding: 0;
  color: ${(props) => props.theme.textSecondary};
  &:active {
    animation-name: '';
  }
`;

const ToggleIcon = styled.span`
  display: inline-block;
  width: 2.4rem;
  height: 1.1rem;
  border-radius: ${(props) => props.theme.borderRadiusSm};
  vertical-align: middle;
  margin-right: 0.5rem;
  background-color: ${(props) => props.theme.buttonSecondary};
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.active ? props.theme.tagBackground : props.theme.buttonSecondaryText};
    position: absolute;
    top: -0.2rem;
    left: ${(props) => (props.active ? '1rem' : '0')};
    transition: ${(props) => props.theme.transitionFast};
  }
`;

const ButtonIcon = styled.button`
  display: inline-block;
  padding: 0;
  color: ${(props) => props.theme.textSecondary};
  position: relative;
  padding-left: 2.3rem;
  svg {
    font-size: 1.8rem;
    position: absolute;
    left: 0;
    top: -0.1rem;
    color: ${(props) =>
      props.isFavorite ? props.theme.tagBackground : props.theme.textSecondary};
  }
`;

const Styled = { VideoData, BroadcastContent, ToggleButton, ToggleIcon, ButtonIcon };
export default Styled;
