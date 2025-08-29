import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CalendarSidebar from './components/CalendarSidebar.jsx';
import MainCalendar from './components/MainCalendar.jsx';
import { getStatics } from '../../features/notes/noteSlice.js';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const { statics, loading } = useSelector((state) => state.notes);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    dispatch(getStatics({ year, month }));
  }, [dispatch, year, month]);

  const todayDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // 달력 변경 값 반영
  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  if (loading) {
    return (
      <Container sx={{ my: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.875rem',
          mb: '0.7rem',
          textAlign: 'left',
        }}
      >
        {todayDate}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            order: { xs: 1, md: 1 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MainCalendar
            statics={statics}
            currentDate={currentDate}
            onDateChange={handleDateChange}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '280px' },
            flexShrink: 0,
            order: { xs: 2, md: 2 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CalendarSidebar statics={statics} currentDate={currentDate} />
        </Box>
      </Box>
    </Container>
  );
};

export default CalendarPage;
