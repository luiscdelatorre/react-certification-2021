const OptionsReducer = (state, action) => {
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
    default:
      return state;
  }
};

export default OptionsReducer;
