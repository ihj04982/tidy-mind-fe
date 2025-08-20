import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FolderOpen, Calendar, User, Moon } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer.jsx';
import Logo from '../assets/logo.png';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          width: '80px',
          height: '100%',
          display: 'flex',
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
          marginLeft: '80px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '80px',
            right: 0,
            backgroundColor: 'transparent',
            display: 'flex',
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
