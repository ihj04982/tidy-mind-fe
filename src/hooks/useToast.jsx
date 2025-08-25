import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Paper, Typography, IconButton, Slide, useTheme } from '@mui/material';
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children, maxToasts = 4 }) {
  const theme = useTheme();
  const [toasts, setToasts] = useState([]);

  // addToast("메시지", { severity: "success"|"error"|"warning"|"info", duration: ms })
  const addToast = useCallback(
    (message, opts = {}) => {
      const id = Date.now();
      const { severity = 'info', duration = 3000 } = opts;

      const toast = { id, message: String(message), severity, duration };

      setToasts((prev) => {
        const next = [...prev, toast];
        if (next.length > maxToasts) next.shift();
        return next;
      });

      // 자동 닫힘
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);

      return id;
    },
    [maxToasts],
  );

  // 수동 닫기
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 색상 매핑
  const getColors = (severity) => {
    switch (severity) {
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

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Container */}
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
                  onClick={() => removeToast(t.id)}
                  sx={{ ml: 1, color: text }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Slide>
          );
        })}
      </Box>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
