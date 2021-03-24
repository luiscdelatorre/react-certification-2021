import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import detail from '../../mock/youtube-detail-mock.json';
import channel from '../../mock/youtube-channel-mock.json';
import VideoDetailContent from './VideoDetailContent.component';

describe('Video Detail Content component', () => {
  it('Should display mock data in component', () => {
    const video = detail.items[0];
    const videoChannel = channel.items[0];
    render(
      <VideoDetailContent
        channel={videoChannel.snippet.title}
        channelLogo={videoChannel.snippet.thumbnails.default.url}
        subscriberCount={videoChannel.statistics.subscriberCount}
        description={video.snippet.description}
      />
    );

    expect(screen.queryByText(videoChannel.snippet.title).tagName).toBe('H5');
    expect(
      screen.queryByText(`${videoChannel.statistics.subscriberCount} Subscribers`).tagName
    ).toBe('H6');
  });

  it('Validates Video Detail snapshot', () => {
    const videoChannel = channel.items[0];
    const video = detail.items[0];
    const component = renderer.create(
      <VideoDetailContent
        channel={videoChannel.snippet.title}
        channelLogo={videoChannel.snippet.thumbnails.default.url}
        subscriberCount={video.statistics.subscriberCount}
        description={video.snippet.description}
      />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
