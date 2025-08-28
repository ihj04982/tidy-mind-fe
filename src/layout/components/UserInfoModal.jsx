import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';

export default function UserInfoModal({ open, onClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      disableEnforceFocus
      disableAutoFocus
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">사용자 정보</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 48, height: 48 }} />
          <Stack>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap title={user.email}>
              {user.email}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" size="small" sx={{ margin: '0.5rem' }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
