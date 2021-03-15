import React, { useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import { Container, MainContent } from './Layout.styles';

const Layout = ({ children }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <Container isMenuExpanded={isMenuExpanded}>
      <Header isMenuExpanded={isMenuExpanded} onToggleMenu={handleToggleMenu} />
      <Menu isExpanded={isMenuExpanded} />
      <MainContent data-testid="main-content">{children}</MainContent>
    </Container>
  );
};

export default Layout;
