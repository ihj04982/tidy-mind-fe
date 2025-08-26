import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export default function LoadingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={48} thickness={4} color="primary" />
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
}
