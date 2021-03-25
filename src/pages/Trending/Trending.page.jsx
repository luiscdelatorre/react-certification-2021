import React, { useEffect, useState } from 'react';
import { YoutubeApi } from '../../api/youtube.api';
import VideoCard from '../../components/VideoCard';
import { formatDate } from '../../utils/fns';
import Styled from '../Home/Home.styles';

const TrendingPage = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      YoutubeApi.trending()
        .then((result) => {
          setTrendingVideos(result?.items);
        })
        .catch(() => {
          setError(
            `The request cannot be completed because you have exceeded your quota.
            Please try again later.`
          );
        });
    };
    fetchData();
  }, []);

  return (
    <Styled.Container>
      <Styled.Hero>
        <h2>Most popular videos</h2>
      </Styled.Hero>
      <hr />
      {error ? (
        <Styled.Error>{error}</Styled.Error>
      ) : (
        <Styled.CardList data-testid="trending-list">
          {trendingVideos.map(
            ({
              etag,
              id,
              snippet: {
                title,
                channelTitle,
                publishedAt,
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
                    date={formatDate(publishedAt)}
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

export default TrendingPage;
