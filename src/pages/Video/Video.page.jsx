import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { YoutubeApi } from '../../api/youtube.api';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import { useAuth } from '../../providers/Auth';
import Styled from './Video.styles';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos.component';
import VideoDetail from '../../components/VideoDetail';
import { shuffleArray } from '../../utils/fns';

const VideoPage = () => {
  const { id } = useParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const { state } = useSessionData();
  const { authenticated } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      YoutubeApi.detail(id)
        .then((detail) => {
          if (!detail || !detail.items.length) {
            history.push('/not-found');
          } else {
            setVideo(detail.items[0]);
            const { channelId } = detail.items[0]?.snippet;
            YoutubeApi.channel(channelId).then((result) => {
              setChannel(result.items[0]);
            });
            YoutubeApi.related(id).then((related) => {
              setRelatedVideos(related?.items);
            });
          }
        })
        .catch(() => {
          history.push('/server-error');
        });
    };

    fetchData();
  }, [authenticated, history, id, location]);

  return (
    <Styled.Container>
      <Styled.VideoContainer>
        <VideoDetail videoId={id} video={video} channel={channel} />
      </Styled.VideoContainer>
      <Styled.RelatedVideosContainer data-testid="related-videos">
        {authenticated &&
          location.pathname.match(/favorites/) &&
          state.user?.favorites?.length > 1 && (
            <>
              <Styled.RelatedVideosTitle>Your Favorites</Styled.RelatedVideosTitle>
              <RelatedVideos
                to="favorites"
                videos={shuffleArray(state.user.favorites)
                  .filter((favorite) => favorite.id !== id)
                  .map((favorite) => ({
                    id: favorite.id,
                    title: favorite.title,
                    channel: favorite.channel,
                    thumbnail: favorite.thumbnail,
                    liveBroadcastContent: favorite.liveBroadcastContent,
                  }))}
              />
            </>
          )}
        <Styled.RelatedVideosTitle>Related Videos</Styled.RelatedVideosTitle>
        <RelatedVideos
          videos={relatedVideos
            .filter((relatedVideo) => relatedVideo.snippet)
            .map(
              ({
                id: { videoId },
                snippet: { title, channelTitle, thumbnails, liveBroadcastContent },
              }) => ({
                id: videoId,
                title,
                channel: channelTitle,
                thumbnail: thumbnails.medium.url,
                liveBroadcastContent,
              })
            )}
        />
      </Styled.RelatedVideosContainer>
    </Styled.Container>
  );
};

export default VideoPage;
