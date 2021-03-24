import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import SessionDataProvider from '../../providers/SessionData/SessionData.provider';
import SearchProvider from '../../providers/Search/Search.provider';
import Layout from '../Layout';
import Routes from '../Routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionDataProvider>
          <SearchProvider>
            <Layout>
              <Routes />
            </Layout>
          </SearchProvider>
        </SessionDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
