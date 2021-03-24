import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AuthProvider from '../../providers/Auth';
import HomePage from './Home.page';
import SearchProvider from '../../providers/Search';
import searchResult from '../../mock/youtube-videos-mock.json';
import { storage } from '../../utils/storage';
import { AUTH_STORAGE_KEY } from '../../utils/constants';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';

jest.mock('axios');

describe('Home Page', () => {
  beforeEach(() => {
    const response = { data: searchResult };
    axios.get.mockResolvedValue(response);
  });

  afterEach(() => {
    jest.clearAllMocks();
    axios.mockRestore();
  });

  it('Should display login option if user is not authenticated', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <HomePage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    expect(screen.queryByTestId('search-list').children.length).toBe(
      searchResult.items.length
    );
    expect(screen.queryByTestId('login-button')).toBeInTheDocument();
    expect(screen.queryByTestId('secret-button')).toBeFalsy();
  });

  it('Should display login option if user is authenticated', async () => {
    storage.set(AUTH_STORAGE_KEY, true);

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <HomePage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    expect(screen.queryByTestId('search-list').children.length).toBe(
      searchResult.items.length
    );
    expect(screen.queryByTestId('login-button')).toBeFalsy();
    expect(screen.queryByTestId('favorites-button')).toBeInTheDocument();
    expect(screen.queryByTestId('trending-button')).toBeInTheDocument();
  });

  it('Should display quota error', async () => {
    axios.get.mockRejectedValue({});

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <HomePage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    expect(
      screen.queryByText(
        'The request cannot be completed because you have exceeded your quota. Please try again later.'
      )
    ).toBeInTheDocument();
  });
});
