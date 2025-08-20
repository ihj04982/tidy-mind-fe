import { Box, Link, Typography, useTheme } from '@mui/material';
import { MoveLeft } from 'lucide-react';
import React from 'react';

import LoginForm from './components/LoginForm.jsx';

export default function LoginPage() {
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
          <MoveLeft size={15} />
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
