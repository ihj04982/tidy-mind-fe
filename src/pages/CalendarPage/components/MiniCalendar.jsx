import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import React from 'react';

const calendarStyles = {
  maxWidth: { xs: '100%', md: 600, lg: '100%' },
  mx: { xs: 'auto', lg: 0 },
  '& .fc': { fontFamily: '"noto-sans", sans-serif' },
  '& .fc-theme-standard td, .fc-theme-standard th, .fc-scrollgrid': { border: 'none' },
  '& .fc-toolbar-title': { fontSize: '1rem', fontWeight: 400, textTransform: 'capitalize' },
  '& .fc-button': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#999',
    padding: 0.25,
    fontSize: '1rem',
    boxShadow: 'none',
    '&:hover, &:active, &.fc-button-active': { backgroundColor: 'transparent', color: '#333' },
    '&:focus': { boxShadow: 'none' },
  },
  '& .fc-prev-button, .fc-next-button .fc-icon': { fontSize: '0.8rem' },
  '& .fc-col-header-cell': {
    padding: '0.5rem 0',
    fontSize: '0.75rem',
    color: '#999',
    textTransform: 'uppercase',
  },
  '& .fc-daygrid-day': {
    padding: 0.25,
    '&:hover': { backgroundColor: '#f5f5f5' },
    '& .fc-daygrid-day-frame': {
      minHeight: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    '& .fc-daygrid-day-number': {
      fontSize: '0.875rem',
      width: '1.75rem',
      height: '1.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.2s',
    },
  },
  '& .fc-day-today': {
    backgroundColor: 'transparent !important',
    '& .fc-daygrid-day-number': { backgroundColor: '#ff6b35', color: 'white', fontWeight: 500 },
  },
  '& .fc-day-selected .fc-daygrid-day-number': { backgroundColor: '#ff6900', color: 'white' },
};

const MiniCalendar = () => (
  <Box sx={calendarStyles}>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
      height="auto"
      dayHeaderFormat={{ weekday: 'narrow' }}
      titleFormat={{ month: 'long', year: 'numeric' }}
      fixedWeekCount={false}
      selectable
      eventDisplay="none"
    />
  </Box>
);

export default MiniCalendar;
