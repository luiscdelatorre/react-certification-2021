import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import OptionsProvider from '../../providers/Options/Options.provider';
import SearchProvider from '../../providers/Search';
import Layout from './Layout.component';

describe('Layout component', () => {
  it('Should check main components in Layout', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <OptionsProvider>
              <Layout />
            </OptionsProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.queryByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('menu')).toBeInTheDocument();
    expect(screen.queryByTestId('main-content')).toBeInTheDocument();
  });

  it('Should trigger menu expanded', () => {
    const { rerender } = render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <OptionsProvider>
              <Layout />
            </OptionsProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const button = screen.queryByTestId('button-menu');
    const initialClassName = button.className;
    fireEvent.click(button);
    rerender(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <OptionsProvider>
              <Layout />
            </OptionsProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(initialClassName).not.toBe(button.className);
  });

  it('Validates Layout snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <OptionsProvider>
              <Layout />
            </OptionsProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
