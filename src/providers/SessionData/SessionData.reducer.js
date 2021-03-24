const SessionDataReducer = (state, action) => {
  let currentTheme = '';
  switch (action.type) {
    case 'SET_THEME':
      currentTheme = action.theme.toLowerCase();

      if (currentTheme === 'system') {
        currentTheme =
          window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
      }
      return { ...state, ...{ currentTheme, theme: action.theme } };
    case 'SET_AUTOPLAY':
      return { ...state, autoplay: action.autoplay };
    case 'SET_MENU':
      return { ...state, menuCompact: action.menuCompact };
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default SessionDataReducer;
