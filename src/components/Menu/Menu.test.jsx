import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import { AUTH_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import Menu from './Menu.component';

describe('Menu Component', () => {
  it('Should Render all Menu options', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Menu isExpanded={false} />
        </AuthProvider>
      </BrowserRouter>
    );
    const totalMenuItems = screen.getAllByRole('listitem').length;

    expect(totalMenuItems).toBe(4);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Options')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('Should trigger logout event', () => {
    storage.set(AUTH_STORAGE_KEY, true);

    render(
      <BrowserRouter>
        <AuthProvider>
          <Menu isExpanded={false} />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).toBeInTheDocument();

    const button = screen.getByTestId('button-logout');
    fireEvent.click(button);

    expect(screen.queryByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('Validates Menu snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <Menu isExpanded={false} />
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
