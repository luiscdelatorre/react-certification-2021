import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import SearchProvider from '../../providers/Search';
import Header from './Header.component';
import { storage } from '../../utils/storage';
import { MENU_STORAGE_KEY } from '../../utils/constants';

describe('Header component', () => {
  it('Should expand menu size on menu button click', () => {
    storage.set(MENU_STORAGE_KEY, 'compact');
    const { rerender } = render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <SessionDataProvider>
              <Header />
            </SessionDataProvider>
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
            <SessionDataProvider>
              <Header />
            </SessionDataProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(initialClassName).not.toBe(button.className);
    expect(storage.get(MENU_STORAGE_KEY)).not.toBe('compact');
  });

  it('Validates Header snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <SessionDataProvider>
              <Header />
            </SessionDataProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
