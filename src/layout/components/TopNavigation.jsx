import { Button, Drawer, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { FolderOpen, Calendar, User, Moon, AlignJustify, X, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ProfileMenu from './ProfileMenu.jsx';
import Logo from '../../assets/logo.png';
import { logout } from '../../features/auth/authSlice.js';

const TopNavigation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: 3,
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: 3,
          }}
        >
          <Box
            onClick={() => navigate('/')}
            sx={{
              width: '120px',
              height: '31px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotate(90deg)',
            }}
          >
            <img src={Logo} style={{ height: '120px' }} />
          </Box>
          <Button
            sx={{ width: '32px', height: '32px', color: theme.palette.text.primary }}
            onClick={toggleDrawer(false)}
          >
            <X size={16} />
          </Button>
        </Box>
        <Button
          onClick={() => navigate('/collections')}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'center',
            gap: '0.875rem',
            color: theme.palette.text.primary,
            padding: '8px 12px',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <FolderOpen width={16} />
          <Typography fontSize={'14px'}>Collections</Typography>
        </Button>
        <Button
          onClick={() => navigate('/calendar')}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'center',
            gap: '0.875rem',
            color: theme.palette.text.primary,
            padding: '8px 12px',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <Calendar width={16} />
          <Typography fontSize={'14px'}>Calendar</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          paddingTop: '1rem',
          borderTop: `1px solid  ${theme.palette.border.default}`,
        }}
      >
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
        >
          <Moon width={16} />
          <Typography fontSize={'14px'}>Dark Mode</Typography>
        </Button>
        <Button
          onClick={() => navigate(user ? dispatch(logout()) : '/login')}
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
        >
          <LogOut width={16} />
          <Typography fontSize={'14px'}>{user ? 'Logout' : 'Login / Sign Up'}</Typography>
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'end',
          alignItems: 'center',
          position: 'fixed',
          backgroundColor: hasScrolled ? '#e5ebf98d' : theme.palette.background.default,
          boxShadow: hasScrolled ? '0px 0px 10px rgba(68, 68, 68, 0.3)' : 0,
          backdropFilter: hasScrolled ? 'blur(6px)' : 0,
          zIndex: 111,
          left: 0,
          right: 0,
          top: 0,
          padding: '0.725rem 1rem',
        }}
      >
        <Button
          sx={{
            display: { xs: 'flex', md: 'none' },
            minWidth: 40,
            height: 40,
          }}
          onClick={toggleDrawer(true)}
        >
          <AlignJustify size={20} color="#737373" />
        </Button>
      </Box>
      <Drawer
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(234, 234, 234, 0.3)',
            backdropFilter: 'blur(5px)',
          },
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: hasScrolled ? '#e5ebf98d' : theme.palette.background.default,
          boxShadow: hasScrolled ? '0px 0px 10px rgba(68, 68, 68, 0.3)' : 0,
          backdropFilter: hasScrolled ? 'blur(6px)' : 0,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'end',
          paddingBottom: '1rem',
          paddingTop: '1rem',
          paddingRight: 4,
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
      >
        <Button
          disableRipple
          sx={{
            minWidth: '48px',
            height: '48px',
            padding: 0,
            borderRadius: '30px',
          }}
        >
          <Moon color="#737373" size={20} strokeWidth={1.5} />
        </Button>
        {user ? (
          <ProfileMenu />
        ) : (
          <Button
            onClick={() => navigate('/login')}
            disableRipple
            sx={{
              minWidth: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '30px',
            }}
          >
            <User color="#737373" size={20} strokeWidth={1.5} />
          </Button>
        )}
      </Box>
    </>
  );
};

export default TopNavigation;
