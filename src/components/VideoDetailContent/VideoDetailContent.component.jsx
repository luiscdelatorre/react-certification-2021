import React from 'react';
import Styled from './VideoDetailContent.styles';

const VideoDetailContent = ({ channel, channelLogo, subscriberCount, description }) => {
  return (
    <div>
      <Styled.DescriptionContainer>
        <Styled.DescriptionLogo src={channelLogo} alt="channel" />
        <hgroup>
          <Styled.Title>{channel}</Styled.Title>
          <Styled.Subtitle>{subscriberCount} Subscribers</Styled.Subtitle>
        </hgroup>
      </Styled.DescriptionContainer>
      <Styled.Description>{description}</Styled.Description>
    </div>
  );
};

export default VideoDetailContent;
