import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../providers/Auth';

const Private = ({ children, ...rest }) => {
  const { authenticated, loading } = useAuth();

  return (
    !loading && (
      <Route
        {...rest}
        render={() => (authenticated ? children : <Redirect to="/login" />)}
      />
    )
  );
};

export default Private;
