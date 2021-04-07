import React, { useEffect, useState } from 'react';
import { IoArrowBack, IoHeart, IoHeartOutline, IoShareSocial } from 'react-icons/io5';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import { useAuth } from '../../providers/Auth/Auth.provider';
import Styled from './VideoCardOptions.styles';

const VideoCardOptions = ({
  id,
  title,
  channel,
  date,
  thumbnail,
  liveBroadcastContent,
  onToggleOptions,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { state, setUser } = useSessionData();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      setIsFavorite(state.user?.favorites?.some((x) => x.id === id));
    }
  }, [authenticated, id, state.user]);

  const toggleOptions = (event) => {
    onToggleOptions(event);
  };

  const addFavorite = () => {
    const favorite = {
      id,
      title,
      channel,
      date,
      thumbnail,
      liveBroadcastContent,
    };
    state.user?.favorites?.push(favorite);
  };

  const removeFavorite = () => {
    const index = state.user?.favorites?.findIndex((x) => x.id === id);
    state.user?.favorites?.splice(index, 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addFavorite();
    } else {
      removeFavorite();
    }
    setUser(state.user);
  };

  return (
    <Styled.OptionsList>
      <li>
        <Styled.Option data-testid="back-button" type="button" onClick={toggleOptions}>
          <IoArrowBack />
        </Styled.Option>
      </li>
      {authenticated && (
        <li>
          <Styled.Option
            data-testid="favorite-button"
            type="button"
            onClick={toggleFavorite}
          >
            {isFavorite ? <IoHeart /> : <IoHeartOutline />}
          </Styled.Option>
        </li>
      )}
      <li>
        <Styled.Option type="button">
          <IoShareSocial />
        </Styled.Option>
      </li>
    </Styled.OptionsList>
  );
};

export default VideoCardOptions;
