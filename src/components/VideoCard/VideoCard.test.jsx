import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import VideoCard from './VideoCard.component';
import searchResult from '../../mock/youtube-videos-mock.json';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import AuthProvider from '../../providers/Auth';
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import UserMock from '../../mock/user.mock.json';

describe('VideoCard component', () => {
  it('Should display mock data in component', () => {
    const video = searchResult.items[1];
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <VideoCard
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
            />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(video.snippet.title).tagName).toBe('H4');
    expect(screen.getByText(video.snippet.channelTitle).tagName).toBe('H5');
    expect(screen.getByText(video.snippet.publishTime).tagName).toBe('P');
  });

  it('Should render conditional item for liveBroadcastContent', () => {
    const video = searchResult.items[0];

    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <VideoCard
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
            />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('upcoming')).toBeInTheDocument();
  });

  it('Should change class to show card options', () => {
    const video = searchResult.items[0];

    storage.set(AUTH_STORAGE_KEY, true);
    storage.set(USER_STORAGE_KEY, UserMock);

    const { rerender } = render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <VideoCard
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
            />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const button = screen.queryByTestId('show-options');
    const card = screen.queryByTestId('card-wrapper');
    const initialClassName = card.className;
    fireEvent.click(button);
    rerender(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <VideoCard
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
            />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(initialClassName).not.toBe(card.className);
  });

  it('Validates VideoCard snapshot', () => {
    const video = searchResult.items[0];
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <VideoCard
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.default.url}
              liveBroadcastContent={video.snippet.liveBroadcastContent}
            />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
