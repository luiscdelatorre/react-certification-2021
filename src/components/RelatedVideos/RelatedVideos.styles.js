import styled from 'styled-components';
import device from '../../config/device';

const VideoList = styled.ul`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-content: flex-start;
`;

const VideoListItem = styled.li`
  padding: 0.5rem 1rem;
  width: 100%;
  @media ${device.laptop} {
    padding: 1rem 2rem;
  }
`;

const Styled = { VideoList, VideoListItem };
export default Styled;
