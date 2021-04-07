import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import trending from '../../mock/youtube-trending-mock.json';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import TrendingPage from './Trending.page';

jest.mock('axios');

describe('Trending Page', () => {
  beforeEach(() => {
    const response = { data: trending };
    axios.get.mockResolvedValue(response);
  });

  afterEach(() => {
    jest.clearAllMocks();
    axios.mockRestore();
  });

  it('Should display trending videos list', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <TrendingPage />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    expect(screen.queryByTestId('trending-list').children.length).toBe(
      trending.items.length
    );
    expect(screen.queryByText('Most popular videos')).toBeInTheDocument();
  });

  it('Should display quota error', async () => {
    axios.get.mockRejectedValue({});

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <TrendingPage />
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
