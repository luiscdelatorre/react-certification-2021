import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Menu from '../Menu';
import { theme } from '../../config/theme';
import { Container, MainContent } from './Layout.styles';
import { useOptions } from '../../providers/Options/Options.provider';
import GlobalStyles from '../../Global.styles';

const Layout = ({ children }) => {
  const { state } = useOptions();

  return (
    <ThemeProvider theme={state.currentTheme === 'dark' ? theme.dark : theme.light}>
      <GlobalStyles />
      <Container isMenuExpanded={!state.menuCompact}>
        <Header />
        <Menu />
        <MainContent data-testid="main-content">{children}</MainContent>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
