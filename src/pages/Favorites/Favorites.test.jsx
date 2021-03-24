import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import { storage } from '../../utils/storage';
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '../../utils/constants';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import FavoritesPage from './Favorites.page';
import favoritesMock from '../../mock/youtube-favorites-mock.json';
import userMock from '../../mock/user.mock.json';

describe('Favorites Page', () => {
  it('Should display no favorites message', async () => {
    storage.set(AUTH_STORAGE_KEY, true);
    storage.set(USER_STORAGE_KEY, userMock);
    await act(async () =>
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <FavoritesPage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      )
    );

    expect(
      screen.queryByText(`You haven't added any video to your favorites yet :(`)
    ).toBeInTheDocument();
  });

  it('Should display favorites', async () => {
    storage.set(AUTH_STORAGE_KEY, true);
    userMock.favorites = favoritesMock;
    storage.set(USER_STORAGE_KEY, userMock);
    await act(async () =>
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <FavoritesPage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      )
    );

    expect(screen.queryByTestId('favorites-list').children.length).toBe(4);
  });
});
