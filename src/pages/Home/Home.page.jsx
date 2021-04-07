import React, { useEffect, useState } from 'react';
import { IoEnterOutline, IoFlame, IoHeart } from 'react-icons/io5';
import { useLocation } from 'react-router';
import { useAuth } from '../../providers/Auth';
import VideoCard from '../../components/VideoCard';
import Styled from './Home.styles';
import { formatDate } from '../../utils/fns';
import { YoutubeApi } from '../../api/youtube.api';
import { useSearch } from '../../providers/Search/Search.provider';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState({ items: [] });
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();
  const { authenticated } = useAuth();
  const { state } = useSessionData();
  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      YoutubeApi.search(searchQuery)
        .then((result) => {
          setSearchResults(result);
        })
        .catch(() => {
          setError(
            `The request cannot be completed because you have exceeded your quota.
            Please try again later.`
          );
        });
    };
    fetchData();
  }, [searchQuery]);

  return (
    <Styled.Container>
      <Styled.Hero>
        {authenticated ? (
          <>
            <h1>Hello {state.user?.name}!</h1>
            <h2>Good to have you back</h2>
            <Styled.ButtonsContainer>
              <Styled.ButtonLinkInfo to="/favorites" data-testid="favorites-button">
                <IoHeart />
                My Favorites
              </Styled.ButtonLinkInfo>
              <Styled.ButtonLinkWarning to="/trending" data-testid="trending-button">
                <IoFlame />
                Trending
              </Styled.ButtonLinkWarning>
            </Styled.ButtonsContainer>
          </>
        ) : (
          <>
            <h1>Hello stranger!</h1>
            <Styled.ButtonsContainer>
              <Styled.ButtonLinkWarning
                to={{
                  pathname: '/login',
                  state: { background: location },
                }}
                data-testid="login-button"
              >
                <IoEnterOutline />
                Let me in
              </Styled.ButtonLinkWarning>
            </Styled.ButtonsContainer>
          </>
        )}
      </Styled.Hero>
      <hr />
      {error ? (
        <Styled.Error>{error}</Styled.Error>
      ) : (
        <Styled.CardList data-testid="search-list">
          {searchResults?.items?.map(
            ({
              etag,
              id,
              snippet: {
                title,
                channelTitle,
                publishTime,
                thumbnails,
                liveBroadcastContent,
              },
            }) => {
              return (
                <Styled.CardListItem key={etag}>
                  <VideoCard
                    id={id.videoId || id}
                    title={title}
                    channel={channelTitle}
                    date={formatDate(publishTime)}
                    thumbnail={thumbnails.medium.url}
                    liveBroadcastContent={liveBroadcastContent}
                  />
                </Styled.CardListItem>
              );
            }
          )}
        </Styled.CardList>
      )}
    </Styled.Container>
  );
};

export default HomePage;
