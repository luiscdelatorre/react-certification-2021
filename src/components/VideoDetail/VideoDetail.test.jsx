import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import detail from '../../mock/youtube-detail-mock.json';
import channel from '../../mock/youtube-channel-mock.json';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import VideoDetail from './VideoDetail.component';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';

describe('Video Detail component', () => {
  it('Should display mock data in component', () => {
    const video = detail.items[0];
    const videoChannel = channel.items[0];
    render(
      <AuthProvider>
        <SessionDataProvider>
          <SearchProvider>
            <VideoDetail videoId={video.id} video={video} channel={videoChannel} />
          </SearchProvider>
        </SessionDataProvider>
      </AuthProvider>
    );

    expect(screen.queryByText(video.snippet.title).tagName).toBe('H2');
    expect(screen.queryByText(videoChannel.snippet.title).tagName).toBe('H5');
  });

  it('Validates Video Detail snapshot', () => {
    const videoChannel = channel.items[0];
    const video = detail.items[0];
    const component = renderer.create(
      <AuthProvider>
        <SessionDataProvider>
          <SearchProvider>
            <VideoDetail videoId={video.id} video={video} channel={videoChannel} />
          </SearchProvider>
        </SessionDataProvider>
      </AuthProvider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
