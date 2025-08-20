import React from 'react';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: '16px',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        {/* Back to home */}
        <Link
          href="/"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.palette.text.secondary,
            mb: '8px',
            transition: 'color 0.2s ease',
            '&:hover': { color: theme.palette.text.primary },
          }}
        >
          <IconButton size="small" sx={{ p: 0, mr: 0.5, color: 'inherit' }}>
            <ArrowBackIosNew fontSize="inherit" />
          </IconButton>
          <Typography component="span" fontSize={12}>
            Back to home
          </Typography>
        </Link>

        {/* LoginForm */}
        <RegisterForm />
      </Box>
    </Box>
  );
}
