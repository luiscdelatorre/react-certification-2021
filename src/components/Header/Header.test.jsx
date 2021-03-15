import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AuthProvider from '../../providers/Auth';
import SearchProvider from '../../providers/Search';
import Header from './Header.component';

describe('Header component', () => {
  it('Should expand menu size on menu button click', () => {
    let isExpanded = false;

    const { rerender } = render(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Header
              isMenuExpanded={isExpanded}
              onToggleMenu={() => {
                isExpanded = !isExpanded;
              }}
            />
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
            <Header isMenuExpanded={isExpanded} onToggleMenu={() => {}} />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(initialClassName).not.toBe(button.className);
  });

  it('Validates Header snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Header isMenuExpanded={false} onToggleMenu={() => {}} />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
