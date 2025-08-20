import React from 'react';
import { useMemo, useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { makeTheme } from '@/lib/theme';

const ColorModeContext = createContext({ mode: 'light', toggle: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => makeTheme(mode), [mode]);

  const api = useMemo(
    () => ({ mode, toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }),
    [mode],
  );

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
