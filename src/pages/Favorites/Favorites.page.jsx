import React from 'react';
import { IoFlame } from 'react-icons/io5';
import VideoCard from '../../components/VideoCard';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import { formatDate } from '../../utils/fns';
import Styled from '../Home/Home.styles';

const FavoritesPage = () => {
  const { state } = useSessionData();

  return (
    <Styled.Container>
      <Styled.Hero>
        <h2>Your favorites {state.user?.name}!</h2>
        <Styled.ButtonsContainer>
          <Styled.ButtonLinkInfo to="/secret" data-testid="secret-button">
            <IoFlame />
            Show me something cool
          </Styled.ButtonLinkInfo>
        </Styled.ButtonsContainer>
      </Styled.Hero>
      <hr />
      {state.user?.favorites?.length > 0 ? (
        <Styled.CardList data-testid="favorites-list">
          {state.user.favorites.map(
            ({ id, title, channel, date, thumbnail, liveBroadcastContent }) => {
              return (
                <Styled.CardListItem key={title}>
                  <VideoCard
                    to="favorites"
                    id={id}
                    title={title}
                    channel={channel}
                    date={formatDate(date)}
                    thumbnail={thumbnail}
                    liveBroadcastContent={liveBroadcastContent}
                  />
                </Styled.CardListItem>
              );
            }
          )}
        </Styled.CardList>
      ) : (
        <h4>You haven&apos;t added any video to your favorites yet :(</h4>
      )}
    </Styled.Container>
  );
};

export default FavoritesPage;
