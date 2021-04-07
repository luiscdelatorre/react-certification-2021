import React, { useEffect, useState } from 'react';
import { IoHeart, IoHeartOutline, IoWifi } from 'react-icons/io5';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import { useAuth } from '../../providers/Auth';
import { formatDate } from '../../utils/fns';
import Styled from './VideoDetailHeader.styles';
import VideoDetailTags from '../TagsList';

const VideoDetailHeader = ({ videoId, snippet, viewCount, channel }) => {
  const { state, setAutoplay, setUser } = useSessionData();
  const { authenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setIsFavorite(state.user?.favorites?.some((x) => x.id === videoId));
    }
  }, [authenticated, state, videoId]);

  const toggleAutoplay = () => {
    setAutoplay(!state.autoplay);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favorite = {
      id: videoId,
      title: snippet?.title,
      channel,
      date: snippet?.publishedAt,
      thumbnail: snippet?.thumbnails.medium.url,
      liveBroadcastContent: snippet?.liveBroadcastContent,
    };
    if (!isFavorite) {
      state.user.favorites.push(favorite);
    } else {
      const index = state.user?.favorites?.findIndex((x) => x.id === videoId);
      state.user.favorites.splice(index, 1);
    }
    setUser(state.user);
  };

  return (
    <>
      {snippet?.liveBroadcastContent !== 'none' && (
        <Styled.BroadcastContent data-testid="broadcast-content">
          <IoWifi />
          {snippet?.liveBroadcastContent}
        </Styled.BroadcastContent>
      )}
      <h2>{snippet?.title}</h2>
      <Styled.VideoData>{viewCount} Views</Styled.VideoData>
      <Styled.VideoData>{formatDate(snippet?.publishedAt)}</Styled.VideoData>
      <Styled.VideoData>
        <Styled.ToggleButton
          type="button"
          data-testid="autoplay"
          onClick={toggleAutoplay}
        >
          <Styled.ToggleIcon active={state.autoplay} />
          Autoplay
        </Styled.ToggleButton>
      </Styled.VideoData>
      {authenticated && (
        <Styled.VideoData>
          <Styled.ButtonIcon
            data-testid="favorite-button"
            type="button"
            onClick={toggleFavorite}
            isFavorite={isFavorite}
          >
            {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            Favorite
          </Styled.ButtonIcon>
        </Styled.VideoData>
      )}
      <VideoDetailTags tags={snippet?.tags || []} />
    </>
  );
};

export default VideoDetailHeader;
