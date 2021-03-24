import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import searchResult from '../../mock/youtube-videos-mock.json';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import AuthProvider from '../../providers/Auth';
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import UserMock from '../../mock/user.mock.json';
import VideoCardOptions from './VideoCardOptions.component';

describe('VideoCard Options component', () => {
  it('Should display mock data in component', () => {
    const video = searchResult.items[1];
    render(
      <AuthProvider>
        <SessionDataProvider>
          <VideoCardOptions
            id={video.id.videoId}
            title={video.snippet.title}
            channel={video.snippet.channelTitle}
            date={video.snippet.publishTime}
            thumbnail={video.snippet.thumbnails.default.url}
            liveBroadcastContent={video.snippet.liveBroadcastContent}
            onToggleOptions={() => {}}
          />
        </SessionDataProvider>
      </AuthProvider>
    );

    expect(screen.queryByTestId('back-button')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-button')).toBeNull();
  });

  it('Should display favorite option', async () => {
    const video = searchResult.items[0];

    storage.set(AUTH_STORAGE_KEY, true);
    storage.set(USER_STORAGE_KEY, UserMock);

    await act(async () =>
      render(
        <AuthProvider>
          <SessionDataProvider>
            <VideoCardOptions
              id={video.id.videoId}
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
              onToggleOptions={() => {}}
            />
          </SessionDataProvider>
        </AuthProvider>
      )
    );

    const back = screen.queryByTestId('back-button');
    const favorite = screen.queryByTestId('favorite-button');
    expect(back).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Should trigger favorite option', async () => {
    const video = searchResult.items[0];

    storage.set(AUTH_STORAGE_KEY, true);
    UserMock.favorites.push({
      id: video.id.videoId,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      date: video.snippet.publishTime,
      thumbnail: video.snippet.thumbnails.default.url,
      liveBroadcastContent: video.snippet.liveBroadcastContent,
    });
    storage.set(USER_STORAGE_KEY, UserMock);

    await act(async () =>
      render(
        <AuthProvider>
          <SessionDataProvider>
            <VideoCardOptions
              id={video.id.videoId}
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
              onToggleOptions={() => {}}
            />
          </SessionDataProvider>
        </AuthProvider>
      )
    );

    const back = screen.queryByTestId('back-button');
    const favorite = screen.queryByTestId('favorite-button');
    expect(back).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();

    fireEvent.click(back);
    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(1);
    await act(async () => fireEvent.click(favorite));
    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(0);
    await act(async () => fireEvent.click(favorite));
    expect(storage.get(USER_STORAGE_KEY).favorites.length).toBe(1);
  });
});
