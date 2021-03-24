import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Menu from '../Menu';
import { theme } from '../../config/theme';
import Styled from './Layout.styles';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import GlobalStyles from '../../Global.styles';

const Layout = ({ children }) => {
  const { state } = useSessionData();

  return (
    <ThemeProvider theme={state.currentTheme === 'dark' ? theme.dark : theme.light}>
      <GlobalStyles />
      <Styled.Container isMenuExpanded={!state.menuCompact}>
        <Header />
        <Menu />
        <Styled.MainContent data-testid="main-content">{children}</Styled.MainContent>
      </Styled.Container>
    </ThemeProvider>
  );
};

export default Layout;
