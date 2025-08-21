import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';

const MiniCalendar = () => {
  const theme = useTheme();
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const MONTH_LABELS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const handlePrevMonth = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    setCurrentDate(calendarApi?.getDate() || new Date());
  };

  const handleNextMonth = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    setCurrentDate(calendarApi?.getDate() || new Date());
  };

  const calendarStyles = {
    '& .fc': { fontFamily: theme.typography.fontFamily },
    '& .fc-theme-standard td, .fc-theme-standard th, .fc-scrollgrid': { border: 'none' },
    '& .fc-toolbar': { display: 'none' },
    '& .fc-col-header-cell': {
      padding: { xs: '0.5rem 0', lg: '0.25rem 0' },
      fontSize: { xs: '0.75rem', lg: '0.625rem' },
      color: theme.palette.text.secondary,
      textTransform: 'uppercase',
    },
    '& .fc-daygrid-day': {
      padding: { xs: '0.125rem', lg: '0.0625rem' },
      '&:hover': { backgroundColor: '#f5f5f5' },
      '& .fc-daygrid-day-frame': {
        minHeight: { xs: '1.5rem', md: '1.5rem', lg: '1rem' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      '& .fc-daygrid-day-number': {
        fontSize: { xs: '0.75rem', lg: '0.625rem' },
        width: { xs: '1.5rem', lg: '1.25rem' },
        height: { xs: '1.5rem', lg: '1.25rem' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'all 0.2s',
      },
    },
    '& .fc-day-today': {
      backgroundColor: 'transparent !important',
      '& .fc-daygrid-day-number': {
        backgroundColor: theme.palette.text.accent,
        color: theme.palette.background.paper,
        fontWeight: 500,
      },
    },
    '& .fc-day-selected .fc-daygrid-day-number': {
      backgroundColor: theme.palette.text.accent,
      color: theme.palette.background.paper,
    },
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        minHeight: { lg: '480px' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
        <IconButton size="small" onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 120, textAlign: 'center', fontSize: '0.8rem' }}>
          {MONTH_LABELS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        <IconButton size="small" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={calendarStyles}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          height="auto"
          dayHeaderFormat={{ weekday: 'narrow' }}
          fixedWeekCount={false}
          selectable
          eventDisplay="none"
          datesSet={(arg) => setCurrentDate(arg.view.calendar.getDate())}
        />
      </Box>
    </Paper>
  );
};

export default MiniCalendar;
