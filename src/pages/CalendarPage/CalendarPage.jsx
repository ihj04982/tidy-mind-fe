import { Box, Container } from '@mui/material';
import React from 'react';

import CalendarSidebar from './components/CalendarSidebar.jsx';
import MainCalendar from './components/MainCalendar.jsx';

const CalendarPage = () => (
  <Container sx={{ my: 20 }}>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: { xs: 'stretch', lg: 'flex-start' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '300px' },
          flexShrink: 0,
          order: { xs: 2, lg: 1 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CalendarSidebar />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          order: { xs: 1, lg: 2 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MainCalendar />
      </Box>
    </Box>
  </Container>
);

export default CalendarPage;
