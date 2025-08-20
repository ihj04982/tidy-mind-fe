import { createTheme } from '@mui/material/styles';

/** 라이트/다크 팔레트 */
const light = {
  mode: 'light',
  background: { default: '#E8EBFA', paper: '#FFFFFF' }, // background: pale-blue
  text: { primary: '#0a0a0a', secondary: '#737373', accent: '#FF6900' }, // foreground / muted / orange
  primary: { main: '#8EA5E7', contrastText: '#FFFFFF' }, // periwinkle
  secondary: { main: '#C3CEF4', contrastText: '#FFFFFF' }, // lavender
  divider: '#e5e7eb', // border
};
const dark = {
  // TODO: 색상 수정 필요
  mode: 'dark',
  background: { default: '#E8EBFA', paper: '#FFFFFF' }, // background: pale-blue
  text: { primary: '#0a0a0a', secondary: '#737373', accent: '#FF6900' }, // foreground / muted / orange
  primary: { main: '#8EA5E7', contrastText: '#FFFFFF' }, // periwinkle
  secondary: { main: '#C3CEF4', contrastText: '#FFFFFF' }, // lavender
  divider: '#e5e7eb', // border
};

/**
 * theme 사용법
 * - background: palette.background.default / paper
 * - foreground: palette.text.primary
 * - muted:      palette.text.secondary
 */
export const makeTheme = (mode = 'light') =>
  createTheme({
    palette: mode === 'light' ? light : dark,
    typography: {
      fontFamily: `사용할 폰트`,
      button: { textTransform: 'none' },
    },
  });
