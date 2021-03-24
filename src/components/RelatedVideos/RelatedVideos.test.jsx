import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import relatedVideos from '../../mock/youtube-related-videos-mock.json';
import RelatedVideos from './RelatedVideos.component';

const videos = relatedVideos.items.map((video) => ({
  ...video,
  id: video.id.videoId,
}));

describe('Related Videos component', () => {
  it('Should display mock data in component', () => {
    render(
      <BrowserRouter>
        <RelatedVideos videos={videos} />
      </BrowserRouter>
    );

    const totalMenuItems = screen.getAllByRole('listitem').length;
    expect(totalMenuItems).toBe(5);
  });

  it('Validates VideoCard snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RelatedVideos videos={videos} />
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
