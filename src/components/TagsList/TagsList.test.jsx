import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TagsList from './TagsList.component';
import SearchProvider from '../../providers/Search';
import { storage } from '../../utils/storage';
import { SEARCH_STORAGE_KEY } from '../../utils/constants';

const tags = ['Foo', 'Bar', 'Baz'];

describe('Tags List component', () => {
  it('Should display mock data in component', () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <TagsList tags={tags} />
        </SearchProvider>
      </BrowserRouter>
    );

    const totalMenuItems = screen.getAllByRole('listitem').length;
    expect(totalMenuItems).toBe(3);
  });

  it('trigger a new search from selected tag', () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <TagsList tags={tags} />
        </SearchProvider>
      </BrowserRouter>
    );

    const button = screen.queryAllByTestId('tag-button')[0];
    fireEvent.click(button);
    expect(storage.get(SEARCH_STORAGE_KEY)).toBe(tags[0]);
  });

  it('Validates TagsList snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <SearchProvider>
          <TagsList tags={tags} />
        </SearchProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
