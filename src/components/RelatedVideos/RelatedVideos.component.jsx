import React from 'react';
import RecomendedCard from '../RelatedVideoCard';
import Styled from './RelatedVideos.styles';

const RelatedVideos = ({ videos, to }) => {
  const maxVideos = 5;

  return (
    <Styled.VideoList>
      {videos
        .filter((video, index) => index < maxVideos)
        .map(({ id, title, channel, thumbnail, liveBroadcastContent }) => (
          <Styled.VideoListItem key={id}>
            <RecomendedCard
              to={to}
              id={id}
              title={title}
              channel={channel}
              thumbnail={thumbnail}
              liveBroadcastContent={liveBroadcastContent}
            />
          </Styled.VideoListItem>
        ))}
    </Styled.VideoList>
  );
};

export default RelatedVideos;
