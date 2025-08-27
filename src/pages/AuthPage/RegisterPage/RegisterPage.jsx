import { Box, Link, Typography, useTheme } from '@mui/material';
import { MoveLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import RegisterForm from './components/RegisterForm.jsx';
import { clearError } from '../../../features/auth/authSlice.js';

export default function RegisterPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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
          component={RouterLink}
          to="/"
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
          onClick={() => dispatch(clearError())}
        >
          <MoveLeft size={15} />
          <Typography component="span" fontSize={12}>
            Back to home
          </Typography>
        </Link>

        {/* RegisterForm */}
        <RegisterForm />
      </Box>
    </Box>
  );
}
