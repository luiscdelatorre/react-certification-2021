import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import detail from '../../mock/youtube-detail-mock.json';
import channel from '../../mock/youtube-channel-mock.json';
import VideoDetailHeader from './VideoDetailHeader.component';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import { storage } from '../../utils/storage';
import {
  AUTH_STORAGE_KEY,
  AUTOPLAY_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../../utils/constants';
import UserMock from '../../mock/user.mock.json';

describe('Video Detail Header component', () => {
  it('Should display mock data in component', () => {
    const video = detail.items[0];
    const videoChannel = channel.items[0];
    video.snippet.tags = undefined;
    video.snippet.liveBroadcastContent = 'live';
    render(
      <AuthProvider>
        <SessionDataProvider>
          <SearchProvider>
            <VideoDetailHeader
              videoId={video.id}
              snippet={video.snippet}
              viewCount={video.statistics.viewCount}
              channel={videoChannel}
            />
          </SearchProvider>
        </SessionDataProvider>
      </AuthProvider>
    );

    expect(screen.queryByText(video.snippet.title).tagName).toBe('H2');
    expect(screen.queryByText(`${video.statistics.viewCount} Views`).tagName).toBe('H5');
    expect(screen.queryByTestId(`broadcast-content`)).toBeInTheDocument();
  });

  it('validates autoplay button', async () => {
    const video = detail.items[0];
    const videoChannel = channel.items[0];
    await act(async () => {
      render(
        <AuthProvider>
          <SessionDataProvider>
            <SearchProvider>
              <VideoDetailHeader
                videoId={video.id}
                snippet={video.snippet}
                viewCount={video.statistics.viewCount}
                channel={videoChannel}
              />
            </SearchProvider>
          </SessionDataProvider>
        </AuthProvider>
      );
    });

    const autoplay = screen.queryByTestId('autoplay');
    fireEvent.click(autoplay);
    expect(storage.get(AUTOPLAY_STORAGE_KEY)).toBe(false);
    fireEvent.click(autoplay);
    expect(storage.get(AUTOPLAY_STORAGE_KEY)).toBe(true);
  });

  it('validates favorite button', async () => {
    const video = detail.items[0];
    const videoChannel = channel.items[0];
    storage.set(AUTH_STORAGE_KEY, true);
    UserMock.favorites.push({
      id: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      date: video.snippet.publishTime,
      thumbnail: video.snippet.thumbnails.default.url,
      liveBroadcastContent: video.snippet.liveBroadcastContent,
    });
    storage.set(USER_STORAGE_KEY, UserMock);

    await act(async () => {
      render(
        <AuthProvider>
          <SessionDataProvider>
            <SearchProvider>
              <VideoDetailHeader
                videoId={video.id}
                snippet={video.snippet}
                viewCount={video.statistics.viewCount}
                channel={videoChannel}
              />
            </SearchProvider>
          </SessionDataProvider>
        </AuthProvider>
      );
    });

    const favorite = screen.queryByTestId('favorite-button');
    expect(favorite).toBeInTheDocument();

    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(1);
    await act(async () => fireEvent.click(favorite));
    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(0);
    await act(async () => fireEvent.click(favorite));
    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(1);
  });

  it('Validates Video Detail snapshot', () => {
    const videoChannel = channel.items[0];
    const video = detail.items[0];
    const component = renderer.create(
      <AuthProvider>
        <SessionDataProvider>
          <SearchProvider>
            <VideoDetailHeader
              videoId={video.id}
              snippet={video.snippet}
              viewCount={video.statistics.viewCount}
              channel={videoChannel}
            />
          </SearchProvider>
        </SessionDataProvider>
      </AuthProvider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
