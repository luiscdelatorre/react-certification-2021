import React from 'react';
import { IoWifi } from 'react-icons/io5';
import Styled from './RelatedVideoCard.styles';

const RelatedVideoCard = ({
  id,
  title,
  channel,
  thumbnail,
  liveBroadcastContent,
  to,
}) => {
  return (
    <Styled.Card to={`/${to || 'video'}/${id}`}>
      <Styled.Header>
        <img src={thumbnail} alt={title} />
        {liveBroadcastContent !== 'none' && (
          <Styled.Tag>
            <IoWifi />
            {liveBroadcastContent}
          </Styled.Tag>
        )}
      </Styled.Header>
      <Styled.Content>
        <Styled.Title title={title}>{title}</Styled.Title>
        <Styled.Subtitle>{channel}</Styled.Subtitle>
      </Styled.Content>
    </Styled.Card>
  );
};

export default RelatedVideoCard;
