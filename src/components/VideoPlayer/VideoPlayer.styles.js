import styled from 'styled-components';

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoPlayerContainer = styled.div`
  border-radius: ${(props) => props.theme.borderRadiusXl};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%;
`;

const Styled = {
  VideoPlayerContainer,
  VideoPlayer,
};

export default Styled;
