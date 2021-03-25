import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import Routes from './Routes.component';
import SearchProvider from '../../providers/Search';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';

jest.mock('axios');

describe('Routes component', () => {
  beforeEach(() => {
    const response = { data: {} };
    axios.get.mockResolvedValue(response);
  });

  afterEach(() => {
    jest.clearAllMocks();
    axios.mockRestore();
  });
  it('Should render first route', async () => {
    window.history.pushState({}, 'Foo', '/');

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Routes />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });
    expect(window.history.state.state).toBeFalsy();
  });
  it('Should allow login option if user is not authenticated', async () => {
    const mockState = {
      state: {
        background: {
          hash: '',
          key: 'foo',
          pathname: '/',
          search: '',
          state: undefined,
        },
      },
    };
    window.history.pushState(mockState, 'Bar', '/login');

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <SessionDataProvider>
              <SearchProvider>
                <Routes />
              </SearchProvider>
            </SessionDataProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });
    expect(window.history.state.state).toBeTruthy();
  });
});
