import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import { AUTH_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import Menu from './Menu.component';

describe('Menu Component', () => {
  it('Should Render all Menu Options', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <Menu />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const totalMenuItems = screen.getAllByRole('listitem').length;

    expect(totalMenuItems).toBe(3);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('Should trigger logout event', () => {
    storage.set(AUTH_STORAGE_KEY, true);

    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <Menu />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const totalMenuItems = screen.getAllByRole('listitem').length;

    expect(totalMenuItems).toBe(4);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Favorites')).toBeInTheDocument();

    const button = screen.getByTestId('button-logout');
    fireEvent.click(button);

    expect(screen.queryByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('Validates Menu snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <Menu />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
