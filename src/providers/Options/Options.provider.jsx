import React, { useCallback, useEffect, useReducer } from 'react';
import { storage } from '../../utils/storage';
import OptionsReducer from './Options.reducer';
import {
  THEME_STORAGE_KEY,
  AUTOPLAY_STORAGE_KEY,
  MENU_STORAGE_KEY,
} from '../../utils/constants';

const OptionsContext = React.createContext(null);

function useOptions() {
  const context = React.useContext(OptionsContext);
  if (!context) {
    throw new Error(`Can't use "useOptions" without an OptionsProvider!`);
  }
  return context;
}

function OptionsProvider({ children }) {
  const [state, dispatch] = useReducer(OptionsReducer, {});

  useEffect(() => {
    const theme = storage.get(THEME_STORAGE_KEY) || 'System';
    const autoplay = storage.get(AUTOPLAY_STORAGE_KEY) || true;
    const menuCompact = storage.get(MENU_STORAGE_KEY) || false;
    dispatch({ type: 'SET_THEME', theme });
    dispatch({ type: 'SET_AUTOPLAY', autoplay });
    dispatch({ type: 'SET_MENU', menuCompact });
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

  return (
    <OptionsContext.Provider value={{ state, setTheme, setAutoplay, setMenu }}>
      {children}
    </OptionsContext.Provider>
  );
}

export { useOptions };
export default OptionsProvider;
