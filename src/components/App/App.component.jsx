import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import SecretPage from '../../pages/Secret';
import Private from '../Private';
import Layout from '../Layout';
import VideoPage from '../../pages/Video';
import SearchProvider from '../../providers/Search/Search.provider';
import OptionsProvider from '../../providers/Options/Options.provider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OptionsProvider>
          <SearchProvider>
            <Layout>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Route exact path="/video/:id">
                  <VideoPage />
                </Route>
                <Private exact path="/secret">
                  <SecretPage />
                </Private>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Layout>
          </SearchProvider>
        </OptionsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
