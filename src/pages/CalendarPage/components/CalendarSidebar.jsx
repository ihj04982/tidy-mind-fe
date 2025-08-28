import { Box } from '@mui/material';
import React from 'react';

// import MiniCalendar from './MiniCalendar.jsx';
import TaskBoard from './TaskBoard.jsx';
import TaskCountHeatmap from './TaskCountHeatmap.jsx';

const CalendarSidebar = ({ currentDate, status }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {/* <MiniCalendar /> */}
      <TaskCountHeatmap status={status} currentDate={currentDate} />
      <TaskBoard status={status} currentDate={currentDate} />
    </Box>
  );
};

export default CalendarSidebar;
