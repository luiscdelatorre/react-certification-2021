import React from 'react';
import { useLocation, Switch, Route } from 'react-router';
import HomePage from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import SecretPage from '../../pages/Secret';
import Private from '../Private';
import VideoPage from '../../pages/Video';
import FavoritesPage from '../../pages/Favorites';
import TrendingPage from '../../pages/Trending';
import LoginModal from '../../pages/Login';

const Routes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginModal} />
        <Route exact path="/video/:id" component={VideoPage} />
        <Route exact path="/trending" component={TrendingPage} />
        <Private exact path="/secret">
          <SecretPage />
        </Private>
        <Private exact path="/favorites">
          <FavoritesPage />
        </Private>
        <Private exact path="/favorites/:id">
          <VideoPage />
        </Private>
        <Route path="*" component={NotFound} />
      </Switch>
      {background && <Route path="/login" component={LoginModal} />}
    </>
  );
};

export default Routes;
