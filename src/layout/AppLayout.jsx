import { Button, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FolderOpen, Calendar, User, Moon, AlignJustify, X, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer.jsx';
import Logo from '../assets/logo.png';

const AppLayout = () => {
  const [open, setOpen] = useState(false);

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
          <User width={16} cursor={'pointer'} />
          <Typography fontSize={'14px'}>Profile</Typography>
        </Button>
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
          }}
        />
        <FolderOpen width={23} cursor={'pointer'} />
        <Calendar width={23} cursor={'pointer'} />
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
        <Button
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            width: 40,
            height: 40,
            display: { xs: 'flex', md: 'none' },
            backgroundColor: '#e5ebf9',
          }}
          onClick={toggleDrawer(true)}
        >
          <AlignJustify color="black" />
        </Button>
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
            position: 'sticky',
            top: 0,
            left: '80px',
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

        <Box sx={{ flex: 1 }}>
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
