import styled from 'styled-components';
import device from '../../config/device';

const Container = styled.section`
  display: grid;
  flex-direction: column;
  background-color: ${(props) => props.theme.heroBackground};
  border-radius: ${(props) => props.theme.borderRadiusXl};
  margin: 2rem;
  display: grid;
  grid-template-areas:
    'video'
    'recommended';
  overflow: hidden;

  @media ${device.laptop} {
    grid-template-areas: 'video recommended';
    grid-template-rows: calc(100vh - 13rem);
    grid-template-columns: auto 36rem;
  }
`;

const VideoContainer = styled.div`
  border-radius: ${(props) => props.theme.borderRadiusXl};
  background-color: ${(props) => props.theme.cardBackground};
  flex: 1;
  height: 100%;
  overflow: auto;
`;

const RelatedVideosContainer = styled.aside`
  overflow: auto;
`;

const RelatedVideosTitle = styled.h4`
  margin: 2rem 2rem 0rem;
  color: ${(props) => props.theme.textSecondary};
`;

const Styled = { Container, VideoContainer, RelatedVideosContainer, RelatedVideosTitle };
export default Styled;
