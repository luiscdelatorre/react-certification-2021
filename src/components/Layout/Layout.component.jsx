import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Menu from '../Menu';
import { theme } from '../../config/theme';
import { Container, MainContent } from './Layout.styles';
import { useOptions } from '../../providers/Options/Options.provider';
import GlobalStyles from '../../Global.styles';

const Layout = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { state } = useOptions();

  const handleToggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <ThemeProvider theme={state.currentTheme === 'dark' ? theme.dark : theme.light}>
      <GlobalStyles />
      <Container isMenuExpanded={isMenuExpanded}>
        <Header isMenuExpanded={isMenuExpanded} onToggleMenu={handleToggleMenu} />
        <Menu isExpanded={isMenuExpanded} />
        <MainContent data-testid="main-content">{children}</MainContent>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
