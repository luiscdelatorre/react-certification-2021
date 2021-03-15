import { fireEvent, queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import Layout from './Layout.component';

describe('Layout component', () => {
  it('Should check all Menu Items in Layout', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Layout />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const totalMenuItems = screen.getAllByRole('listitem').length;

    expect(totalMenuItems).toBe(4);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('Should expand menu size on menu button click', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Layout />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const button = queryByTestId(container, 'button-menu');
    const initialClassName = button.className;
    fireEvent.click(button);
    expect(initialClassName).not.toBe(button.className);
  });

  it('Validates Layout snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Layout />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
