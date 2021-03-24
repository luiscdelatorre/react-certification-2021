import React from 'react';
import Styled from './VideoPlayer.styles';

const VideoPlayer = ({ videoId, autoplay }) => {
  return (
    <Styled.VideoPlayerContainer>
      <Styled.VideoPlayer
        data-testid="video-player"
        title="video"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${
          autoplay ? 1 : 0
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Styled.VideoPlayerContainer>
  );
};

export default VideoPlayer;
