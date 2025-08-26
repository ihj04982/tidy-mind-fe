import { Button, Typography, useTheme } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

import { useColorMode } from './themeProvider';

export default function ThemeToggle({ variant = 'default' }) {
  const theme = useTheme();
  const { mode, toggle } = useColorMode();

  return variant === 'default' ? (
    <Button
      disableRipple
      sx={{
        minWidth: '48px',
        height: '48px',
        padding: 0,
        borderRadius: '30px',
      }}
      onClick={toggle}
    >
      {mode === 'light' ? (
        <Moon color={theme.palette.text.primary} size={20} strokeWidth={1.5} />
      ) : (
        <Sun color={theme.palette.text.primary} size={20} strokeWidth={1.5} />
      )}
    </Button>
  ) : (
    <Button
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
        gap: '0.875rem',
        color: theme.palette.text.primary,
        padding: '8px 12px',
        marginBottom: '0.5rem',
        fontSize: '14px',
        height: '3rem',
        width: '100%',
      }}
      onClick={toggle}
    >
      {mode === 'light' ? (
        <Moon color={theme.palette.text.primary} size={16} strokeWidth={1.5} />
      ) : (
        <Sun color={theme.palette.text.primary} size={16} strokeWidth={1.5} />
      )}
      <Typography fontSize={'14px'}>{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</Typography>
    </Button>
  );
}
