import React from 'react';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#E8EBFA',
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
            color: '#6b7280', // text-muted-foreground
            mb: '8px',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#0b0b0c' }, // hover:text-foreground
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
        <LoginForm />
      </Box>
    </Box>
  );
}
