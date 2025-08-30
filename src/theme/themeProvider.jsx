import { ThemeProvider, CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo, useState, createContext, useContext } from 'react';

import { makeTheme } from './theme';

const ColorModeContext = createContext({ mode: 'light', toggle: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });
  const theme = useMemo(() => makeTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  const api = useMemo(() => ({ mode, toggle: toggleMode }), [mode]);

  return (
    <ColorModeContext.Provider value={api}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
};
