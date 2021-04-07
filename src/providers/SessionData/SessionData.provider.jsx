import React, { useCallback, useEffect, useReducer } from 'react';
import { storage } from '../../utils/storage';
import SessionDataReducer from './SessionData.reducer';
import {
  THEME_STORAGE_KEY,
  AUTOPLAY_STORAGE_KEY,
  MENU_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../../utils/constants';

const SessionDataContext = React.createContext(null);

const useSessionData = () => {
  const context = React.useContext(SessionDataContext);
  if (!context) {
    throw new Error(`Can't use "useSessionData" without an SessionDataProvider!`);
  }
  return context;
};

const SessionDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SessionDataReducer, {});

  useEffect(() => {
    const theme = storage.get(THEME_STORAGE_KEY) || 'System';
    const autoplay =
      storage.get(AUTOPLAY_STORAGE_KEY) !== null
        ? storage.get(AUTOPLAY_STORAGE_KEY)
        : true;
    const menuCompact =
      storage.get(MENU_STORAGE_KEY) !== null ? storage.get(MENU_STORAGE_KEY) : true;
    const user = storage.get(USER_STORAGE_KEY) || { favorites: [] };

    dispatch({ type: 'SET_THEME', theme });
    dispatch({ type: 'SET_AUTOPLAY', autoplay });
    dispatch({ type: 'SET_MENU', menuCompact });
    dispatch({ type: 'SET_USER', user });
  }, []);

  const setTheme = useCallback((theme) => {
    dispatch({ type: 'SET_THEME', theme });
    storage.set(THEME_STORAGE_KEY, theme);
  }, []);

  const setAutoplay = useCallback((autoplay) => {
    dispatch({ type: 'SET_AUTOPLAY', autoplay });
    storage.set(AUTOPLAY_STORAGE_KEY, autoplay);
  }, []);

  const setMenu = useCallback((menuCompact) => {
    dispatch({ type: 'SET_MENU', menuCompact });
    storage.set(MENU_STORAGE_KEY, menuCompact);
  }, []);

  const setUser = useCallback((user) => {
    dispatch({ type: 'SET_USER', user });
    storage.set(USER_STORAGE_KEY, user);
  }, []);

  return (
    <SessionDataContext.Provider
      value={{ state, setTheme, setAutoplay, setMenu, setUser }}
    >
      {children}
    </SessionDataContext.Provider>
  );
};

export { useSessionData };
export default SessionDataProvider;
