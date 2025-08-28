import { createTheme } from '@mui/material/styles';

/** 라이트/다크 팔레트 */
const light = {
  mode: 'light',
  background: { default: '#e5ebf9', paper: '#FFFFFF' },
  text: { primary: '#0a0a0a', secondary: '#737373', accent: '#FF6900', error: '#ef4444' },
  primary: { main: '#8EA5E7', contrastText: '#FFFFFF' },
  secondary: { main: '#C3CEF4', contrastText: '#FFFFFF' },
  border: { default: '#e5e7eb', strong: '#898989', warning: '#fbbf24', error: '#ef4444' },
};

const dark = {
  // TODO: 색상 수정 필요
  mode: 'dark',
  background: { default: '#1a1b2e', paper: '#111122' },
  text: { primary: '#f3f4f6', secondary: '#9ca3af', accent: '#06b6d4', error: '#ef4444' },
  primary: { main: '#5b8cff', contrastText: '#0b0b0c' },
  secondary: { main: '#8b5cf6', contrastText: '#ffffff' },
  border: { default: '#374151', strong: '#9ca3af', warning: '#f59e0b', error: '#ef4444' },
};

/**
 * theme 사용법
 * - background: palette.background.default / paper
 * - foreground: palette.text.primary
 * - muted:      palette.text.secondary
 */
export const makeTheme = (mode = 'light') =>
  createTheme({
    palette: {
      ...(mode === 'light' ? light : dark),
      category: {
        task: '#2F6DF9',
        idea: '#5AA1FA',
        work: '#119D77',
        reminder: '#fd7642',
        goal: '#fe76a2',
        personal: '#fe76a2',
        other: '#E3ABA7',
      },
    },
    typography: {
      fontFamily: `"noto-sans", sans-serif`,
      fontSize: 16,
      button: { textTransform: 'none' },
    },
  });

export const getColors = (mode) => {
  if (mode === 'dark') {
    return {
      empty: 'transparent',
      low: '#aad6daff',
      medium: '#66b8c7ff',
      high: '#34aec4ff',
      veryHigh: '#0081acff',
    };
  }
  return {
    empty: 'transparent',
    low: '#c3cef4',
    medium: '#8ea5e7',
    high: '#5078e5',
    veryHigh: '#0943e5',
  };
};
