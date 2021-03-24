import styled from 'styled-components';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: ${(props) => props.theme.borderRadiusLg};
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: ${(props) => props.theme.transitionSlow};
  a {
    text-decoration: none;
  }
  &:hover {
    box-shadow: 0px 0px 10px -2px ${(props) => props.theme.primary};
  }
`;

const CardWrapper = styled.div`
  transition: ${(props) => props.theme.transitionDefault};
  transform: translateX(${(props) => (props.showOptions ? '-6rem' : '0rem')});
  background-color: ${(props) => props.theme.cardBackground};
  position: relative;
  height: 100%;
`;

const Header = styled.header`
  position: relative;
  overflow: hidden;
  transition: ${(props) => props.theme.transitionDefault};
  &::before {
    content: '';
    background-color: ${(props) => props.theme.cardOptions};
    transition: ${(props) => props.theme.transitionSlow};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 1;
    ${Card}:hover & {
      opacity: 0.8;
    }
  }
  img {
    height: 15rem;
    width: 100%;
    object-position: center;
    object-fit: cover;
    z-index: 0;
    transition: ${(props) => props.theme.transitionSlow};
    transform: scale3d(1.05, 1.05, 1);
    ${Card}:hover & {
      transform: scale3d(1.01, 1.01, 1);
    }
  }
`;

const Content = styled.div`
  text-align: left;
  padding: 2rem;
`;

const Tag = styled.h6`
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

const Title = styled.h4`
  color: ${(props) => props.theme.cardTitle};
  margin-bottom: 1rem;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Subtitle = styled.h5`
  color: ${(props) => props.theme.cardSubtitle};
  font-weight: 400;
`;

const Text = styled.p`
  color: ${(props) => props.theme.cardText};
  font-size: 1.2rem;
  margin: 0;
`;

const OptionsButton = styled.button`
  color: ${(props) => props.theme.optionIcon};
  transition: ${(props) => props.theme.transitionSlow};
  font-size: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.5rem;
  opacity: 0;
  z-index: 2;
  transform: scaleY(${(props) => (props.showOptions ? '0' : '1')});
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Styled = {
  Card,
  CardWrapper,
  Header,
  Content,
  Tag,
  Title,
  Subtitle,
  Text,
  OptionsButton,
};

export default Styled;
