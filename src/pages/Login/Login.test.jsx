import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../providers/Auth';
import LoginModal from './Login.modal';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import { storage } from '../../utils/storage';
import { AUTH_STORAGE_KEY } from '../../utils/constants';
import * as LoginApiFile from '../../api/login.api';

describe('Login Modal', () => {
  it('Check welcome message after render', () => {
    render(
      <AuthProvider>
        <SessionDataProvider>
          <LoginModal />
        </SessionDataProvider>
      </AuthProvider>
    );

    expect(screen.queryByText('Welcome back!')).toBeInTheDocument();
  });

  it('Should trigger login event and display error', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SessionDataProvider>
            <LoginModal />
          </SessionDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const button = screen.getByTestId('btn-login');
    await act(async () => fireEvent.click(button));

    expect(
      await waitFor(() => screen.queryByText('Username and password are required'))
    ).toBeInTheDocument();
  });

  it('Should trigger login event and display credentials error', async () => {
    jest
      .spyOn(LoginApiFile, 'loginApi')
      .mockRejectedValue(new Error('Custom Login Error'));

    await act(async () =>
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <LoginModal />
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      )
    );
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');

    userEvent.type(username, 'foo');
    userEvent.type(password, 'bar');

    const button = screen.getByTestId('btn-login');
    await act(async () => fireEvent.click(button));
    expect(screen.queryByText('Custom Login Error')).toBeInTheDocument();
  });

  it('Should trigger login event', async () => {
    jest.spyOn(LoginApiFile, 'loginApi').mockResolvedValue({ name: 'user' });
    window.history.pushState({}, 'Test Title', '/foo');
    storage.set(AUTH_STORAGE_KEY, false);
    expect(window.location.pathname).toBe('/foo');

    await act(async () =>
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <LoginModal />
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      )
    );
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');

    userEvent.type(username, 'foo');
    userEvent.type(password, 'bar');

    const button = screen.getByTestId('btn-login');
    await act(async () => fireEvent.click(button));
    expect(window.location.pathname).toBe('/secret');
  });
});
