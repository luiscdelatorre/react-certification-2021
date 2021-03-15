import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import Layout from './Layout.component';

describe('Layout component', () => {
  it('Should check main components in Layout', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Layout />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.queryByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('menu')).toBeInTheDocument();
    expect(screen.queryByTestId('main-content')).toBeInTheDocument();
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
