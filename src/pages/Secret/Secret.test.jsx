import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SecretPage from './Secret.page';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import { storage } from '../../utils/storage';
import { USER_STORAGE_KEY } from '../../utils/constants';
import UserMock from '../../mock/user.mock.json';

describe('Secret Page', () => {
  it('Check welcome message and back button in page', () => {
    storage.set(USER_STORAGE_KEY, UserMock);

    render(
      <BrowserRouter>
        <SessionDataProvider>
          <SecretPage />
        </SessionDataProvider>
      </BrowserRouter>
    );

    expect(screen.queryByText('Welcome Wizeline')).toBeInTheDocument();
    expect(screen.queryByText('Back to Home')).toBeInTheDocument();
  });

  it('Validates Secret snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <SessionDataProvider>
          <SecretPage />
        </SessionDataProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
