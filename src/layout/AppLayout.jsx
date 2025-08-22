import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router-dom';

import LeftNavigation from './components/LeftNavigation.jsx';
import TopNavigation from './components/TopNavigation.jsx';
import Footer from './Footer.jsx';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <LeftNavigation />
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
        <TopNavigation />

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
