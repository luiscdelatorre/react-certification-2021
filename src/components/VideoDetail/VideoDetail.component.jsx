import React from 'react';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import Styled from './VideoDetail.styles';
import VideoDetailHeader from '../VideoDetailHeader';
import VideoDetailContent from '../VideoDetailContent';
import VideoPlayer from '../VideoPlayer';

const VideoDetail = ({ videoId, video, channel }) => {
  const { state } = useSessionData();

  return (
    <>
      <VideoPlayer videoId={videoId} autoplay={state.autoplay} />
      <Styled.Container data-testid="video-info">
        <VideoDetailHeader
          videoId={videoId}
          snippet={video.snippet}
          viewCount={video.statistics?.viewCount}
          channel={channel.snippet?.title}
        />
        <hr />
        <VideoDetailContent
          channel={channel.snippet?.title}
          channelLogo={channel.snippet?.thumbnails?.default.url}
          subscriberCount={channel.statistics?.subscriberCount}
          description={video.snippet?.description}
        />
      </Styled.Container>
    </>
  );
};

export default VideoDetail;
