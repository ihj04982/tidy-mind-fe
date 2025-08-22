import { Box } from '@mui/material';
import React from 'react';

import MiniCalendar from './MiniCalendar.jsx';
import TaskCountHeatmap from './TaskCountHeatmap.jsx';

const CalendarSidebar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
          lg: 'column',
        },
        gap: 2,
        height: '100%',
      }}
    >
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <MiniCalendar />
      </Box>
      <TaskCountHeatmap />
    </Box>
  );
};

export default CalendarSidebar;
