import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import {
  AUTH_STORAGE_KEY,
  THEME_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../../utils/constants';
import { storage } from '../../utils/storage';
import User from './User.component';
import UserMock from '../../mock/user.mock.json';

describe('User Component', () => {
  it('should display default user image', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.getByTestId('user-default-icon');

    expect(userImage).toBeInTheDocument();
  });

  it('should display popup menu on click the image', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');

    expect(screen.queryByTestId('popup')).toBeNull();
    fireEvent.click(userImage);
    expect(screen.queryByTestId('popup')).not.toBeNull();
  });

  it('should hide popup menu on click the close button', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');

    expect(screen.queryByTestId('popup')).toBeNull();
    fireEvent.click(userImage);

    const closeButton = screen.queryByTestId('button-close');
    fireEvent.click(closeButton);
    await waitFor(() => expect(screen.queryByTestId('popup')).toBeNull());
  });

  it('should hide popup menu on click the login option', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');

    expect(screen.queryByTestId('popup')).toBeNull();
    fireEvent.click(userImage);

    const linkLogin = screen.queryByTestId('link-login');
    fireEvent.click(linkLogin);
    await waitFor(() => expect(screen.queryByTestId('popup')).toBeNull());
  });

  it('should hide popup menu on click the logout option', async () => {
    storage.set(AUTH_STORAGE_KEY, true);

    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');

    expect(screen.queryByTestId('popup')).toBeNull();
    fireEvent.click(userImage);

    const buttonLogout = screen.queryByTestId('button-logout');
    fireEvent.click(buttonLogout);
    await waitFor(() => expect(screen.queryByTestId('popup')).toBeNull());
  });

  it('Should display themes options and close popup', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');
    fireEvent.click(userImage);

    expect(screen.queryByTestId('menu')).not.toBeNull();
    expect(screen.queryByTestId('submenu')).toBeNull();

    const buttonThemes = screen.queryByTestId('button-themes');
    fireEvent.click(buttonThemes);
    await waitFor(() => expect(screen.queryByTestId('submenu')).not.toBeNull());
    const closeButton = screen.queryByTestId('button-submenu-close');
    fireEvent.click(closeButton);
    await waitFor(() => expect(screen.queryByTestId('submenu')).toBeNull());
  });

  it('Should display themes options and return to main options', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');
    fireEvent.click(userImage);

    expect(screen.queryByTestId('menu')).not.toBeNull();
    expect(screen.queryByTestId('submenu')).toBeNull();

    const buttonThemes = screen.queryByTestId('button-themes');
    fireEvent.click(buttonThemes);
    await waitFor(() => expect(screen.queryByTestId('submenu')).not.toBeNull());
    const returnButton = screen.queryByTestId('button-submenu-back');
    fireEvent.click(returnButton);
    await waitFor(() => expect(screen.queryByTestId('submenu')).toBeNull());
  });

  it('Should select theme options', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const userImage = screen.queryByTestId('user-default-icon');
    fireEvent.click(userImage);
    const buttonThemes = screen.queryByTestId('button-themes');
    fireEvent.click(buttonThemes);
    await waitFor(() => expect(screen.queryByTestId('submenu')).not.toBeNull());

    fireEvent.click(screen.queryByTestId('button-theme-system'));
    expect(storage.get(THEME_STORAGE_KEY)).toBe('System');
    fireEvent.click(screen.queryByTestId('button-theme-dark'));
    expect(storage.get(THEME_STORAGE_KEY)).toBe('Dark');
    fireEvent.click(screen.queryByTestId('button-theme-light'));
    expect(storage.get(THEME_STORAGE_KEY)).toBe('Light');
  });

  it('Should render user image', async () => {
    storage.set(AUTH_STORAGE_KEY, true);
    storage.set(USER_STORAGE_KEY, UserMock);
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <User />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const image = screen.queryByTestId('user-image');
    expect(image.src).toEqual(UserMock.avatarUrl);
  });
});
