import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Paper, Typography, IconButton, Slide, useTheme } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toastRemoved } from './toastSlice';

const getColors = (s) => {
  switch (s) {
    case 'success':
      return { bg: '#4CAF7D', text: '#FFFFFF' };
    case 'error':
      return { bg: '#EF5350', text: '#FFFFFF' };
    case 'warning':
      return { bg: '#FFA726', text: '#212121' };
    case 'info':
    default:
      return { bg: '#42A5F5', text: '#FFFFFF' };
  }
};

export default function ToastMessage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const toasts = useSelector((s) => s.toast.items);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: theme.zIndex.snackbar,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {toasts.map((t) => {
        const { bg, text } = getColors(t.severity);
        return (
          <Slide key={t.id} in direction="left" mountOnEnter unmountOnExit>
            <Paper
              elevation={6}
              sx={{
                minWidth: 240,
                maxWidth: 360,
                px: 2,
                py: 1,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: bg,
                color: text,
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                {t.message}
              </Typography>
              <IconButton
                size="small"
                onClick={() => dispatch(toastRemoved(t.id))}
                sx={{ ml: 1, color: text }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Slide>
        );
      })}
    </Box>
  );
}
