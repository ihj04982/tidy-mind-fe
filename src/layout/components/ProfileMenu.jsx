import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';
import { LogOut, User } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../features/auth/authSlice';

export default function ProfileMenu({ setOpenUserInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserInfo = () => {
    setOpenUserInfo(true);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              minWidth: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '30px',
            }}
          >
            <User color={theme.palette.text.primary} size={20} strokeWidth={1.5} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 16,
                height: 16,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 10,
                width: 8,
                height: 8,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenUserInfo} sx={{ minHeight: 32, fontSize: '0.85rem' }}>
          <ListItemIcon>
            <User size={16} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ minHeight: 32, fontSize: '0.85rem' }}>
          <ListItemIcon>
            <LogOut size={16} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
