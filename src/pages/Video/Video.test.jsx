import React from 'react';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import VideoPage from './Video.page';
import detailVideo from '../../mock/youtube-detail-mock.json';
import relatedVideos from '../../mock/youtube-related-videos-mock.json';
import channel from '../../mock/youtube-channel-mock.json';
import favorites from '../../mock/youtube-favorites-mock.json';
import SearchProvider from '../../providers/Search';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import AuthProvider from '../../providers/Auth';
import { storage } from '../../utils/storage';
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '../../utils/constants';
import UserMock from '../../mock/user.mock.json';

jest.mock('axios');

describe('Video Page', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
    axios.mockRestore();
  });

  it('Render Video Page', async () => {
    const video = detailVideo.items[0];
    axios.get
      .mockResolvedValueOnce({ data: detailVideo })
      .mockResolvedValueOnce({ data: relatedVideos })
      .mockResolvedValueOnce({ data: channel });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/video/${video.id}`]}>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Route path="/video/:id">
                  <VideoPage />
                </Route>
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId('video-player')).toBeInTheDocument();
    expect(screen.queryByTestId('video-info')).toBeInTheDocument();
    expect(screen.queryByTestId('related-videos')).toBeInTheDocument();
    expect(screen.getByText(video.snippet.title).tagName).toBe('H2');
  });

  it('Render Video Favorite Page', async () => {
    axios.get
      .mockResolvedValueOnce({ data: detailVideo })
      .mockResolvedValueOnce({ data: relatedVideos })
      .mockResolvedValueOnce({ data: channel })
      .mockResolvedValue({ data: detailVideo });

    const video = detailVideo.items[0];
    storage.set(AUTH_STORAGE_KEY, true);
    UserMock.favorites.push(...favorites);
    storage.set(USER_STORAGE_KEY, UserMock);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/favorites/${video.id}`]}>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Route path="/favorites/:id">
                  <VideoPage />
                </Route>
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId('related-videos')).toBeInTheDocument();
    expect(screen.getByText('Your Favorites')).toBeInTheDocument();
  });

  it('Should redirect to not found', async () => {
    axios.get.mockResolvedValue({});

    const video = detailVideo.items[0];
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/video/${video.id}`]}>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Route path="/video/:id">
                  <VideoPage />
                </Route>
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('related-videos')).not.toBeInTheDocument();
  });

  it('Should redirect after api call error', async () => {
    const video = detailVideo.items[0];
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/video/${video.id}`]}>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Route path="/video/:id">
                  <VideoPage />
                </Route>
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('related-videos')).not.toBeInTheDocument();
  });

  it('Should throw an error if context is not valid in Video component', () => {
    const spyContext = jest.spyOn(React, 'useContext').mockImplementation(() => null);

    expect(() =>
      render(
        <BrowserRouter>
          <SessionDataProvider>
            <VideoPage />
          </SessionDataProvider>
        </BrowserRouter>
      )
    ).toThrow(`Can't use "useSessionData" without an SessionDataProvider!`);
    expect(spyContext).toHaveBeenCalled();
  });
});
