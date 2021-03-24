import React, { useState } from 'react';
import { IoEllipsisVertical, IoWifi } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Styled from './VideoCard.styles';
import VideoCardOptions from '../VideoCardOptions';

const VideoCard = ({ id, title, channel, date, thumbnail, liveBroadcastContent, to }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (event) => {
    event.preventDefault();
    setShowOptions(!showOptions);
  };

  return (
    <Styled.Card>
      <Styled.CardWrapper data-testid="card-wrapper" showOptions={showOptions}>
        <VideoCardOptions
          id={id}
          title={title}
          channel={channel}
          date={date}
          thumbnail={thumbnail}
          liveBroadcastContent={liveBroadcastContent}
          onToggleOptions={toggleOptions}
        />
        <Link to={`/${to || 'video'}/${id}`}>
          <Styled.Header>
            <Styled.OptionsButton
              type="button"
              onClick={toggleOptions}
              showOptions={showOptions}
              data-testid="show-options"
            >
              <IoEllipsisVertical />
            </Styled.OptionsButton>
            <img src={thumbnail} alt={title} />
          </Styled.Header>
          <Styled.Content>
            <Styled.Title title={title}>{title}</Styled.Title>
            <Styled.Subtitle>{channel}</Styled.Subtitle>
            <Styled.Text>{date}</Styled.Text>
            {liveBroadcastContent !== 'none' && (
              <footer>
                <hr />
                <Styled.Tag>
                  <IoWifi />
                  {liveBroadcastContent}
                </Styled.Tag>
              </footer>
            )}
          </Styled.Content>
        </Link>
      </Styled.CardWrapper>
    </Styled.Card>
  );
};

export default VideoCard;
