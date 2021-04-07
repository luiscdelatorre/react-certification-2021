import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RecommendedCard from './RelatedVideoCard.component';
import relatedVideos from '../../mock/youtube-related-videos-mock.json';

describe('Related Video Card component', () => {
  it('Should display mock data in component', () => {
    const video = relatedVideos.items[0];
    const { title, channelTitle, thumbnail, liveBroadcastContent } = video.snippet;
    const { id } = video;
    render(
      <BrowserRouter>
        <RecommendedCard
          id={id.videoId}
          title={title}
          channel={channelTitle}
          thumbnail={thumbnail}
          liveBroadcastContent={liveBroadcastContent}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(video.snippet.title).tagName).toBe('H5');
    expect(screen.getByText(video.snippet.channelTitle).tagName).toBe('H6');
  });
  it('Should render conditional item for liveBroadcastContent', () => {
    const video = relatedVideos.items[0];
    const { title, channelTitle, thumbnail, liveBroadcastContent } = video.snippet;
    const { id } = video;
    render(
      <BrowserRouter>
        <RecommendedCard
          id={id.videoId}
          title={title}
          channel={channelTitle}
          thumbnail={thumbnail}
          liveBroadcastContent={liveBroadcastContent}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(video.snippet.title).tagName).toBe('H5');
    expect(screen.getByText(video.snippet.channelTitle).tagName).toBe('H6');
    expect(screen.getByText('live')).toBeInTheDocument();
  });

  it('Validates VideoCard snapshot', () => {
    const video = relatedVideos.items[0];
    const { title, channelTitle, thumbnail, liveBroadcastContent } = video.snippet;
    const { id } = video;
    const component = renderer.create(
      <BrowserRouter>
        <RecommendedCard
          id={id.videoId}
          title={title}
          channel={channelTitle}
          thumbnail={thumbnail}
          liveBroadcastContent={liveBroadcastContent}
        />
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
