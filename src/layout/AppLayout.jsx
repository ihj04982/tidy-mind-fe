import { Button, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FolderOpen, Calendar, User, Moon, AlignJustify, X, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Footer from './Footer.jsx';
import Logo from '../assets/logo.png';

const AppLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        height: '100',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: 3,
      }}
    >
      <Box>
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: 3,
          }}
        >
          <Box
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
          <Button size="32px" color="#111" onClick={toggleDrawer(false)}>
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
            color: 'black',
            padding: '8px 12px',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <FolderOpen width={16} cursor={'pointer'} />
          <Typography fontSize={'14px'}>Collections</Typography>
        </Button>
        <Button
          onClick={() => navigate('/calendar')}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'center',
            gap: '0.875rem',
            color: 'black',
            padding: '8px 12px',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <Calendar width={16} cursor={'pointer'} />
          <Typography fontSize={'14px'}>Calendar</Typography>
        </Button>
      </Box>
      <Box sx={{ width: '100%', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
        <Button
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'center',
            gap: '0.875rem',
            color: 'black',
            padding: '8px 12px',
            marginBottom: '0.5rem',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <Moon width={16} cursor={'pointer'} />
          <Typography fontSize={'14px'}>Dark Mode</Typography>
        </Button>
        <Button
          onClick={() => navigate('/login')}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'center',
            gap: '0.875rem',
            color: 'black',
            padding: '8px 12px',
            marginBottom: '0.5rem',
            fontSize: '14px',
            height: '3rem',
            width: '100%',
          }}
        >
          <LogOut width={16} cursor={'pointer'} />
          <Typography fontSize={'14px'}>Login / Sign Up</Typography>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          width: '80px',
          height: '100vh',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 4,
          backgroundColor: '#fff',
          boxShadow: 1,
          borderRight: '1px solid #e5e5e5',
          zIndex: 999,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: 24,
            marginTop: 7,
            marginBottom: 1.5,
            cursor: 'pointer',
          }}
        />
        <Button
          disableRipple
          onClick={() => navigate('/collections')}
          sx={{ padding: 0, color: 'black' }}
        >
          <FolderOpen width={23} cursor={'pointer'} />
        </Button>
        <Button
          disableRipple
          onClick={() => navigate('/calendar')}
          sx={{ padding: 0, color: 'black' }}
        >
          <Calendar width={23} cursor={'pointer'} />
        </Button>
      </Box>

      <Box
        sx={{
          position: 'relative',
          marginLeft: { xs: 0, md: '80px' },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'end',
            position: 'fixed',
            backgroundColor: '#e5ebf9',
            zIndex: 111,
            left: 0,
            right: 0,
            top: 0,
            padding: '1rem 0.5rem 0.7rem',
          }}
        >
          <Button
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: 40,
              height: 40,
              backgroundColor: '#e5ebf9',
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
            backgroundColor: '#e5ebf9',
            // backdropFilter: 'blur(6px)',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'end',
            paddingBottom: '20px',
            paddingTop: '32px',
            paddingRight: 4,
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
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'auto' }}
        >
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
