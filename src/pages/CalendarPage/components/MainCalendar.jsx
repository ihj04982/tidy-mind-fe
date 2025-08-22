import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box, Paper, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';

import EventModal from './EventModal.jsx';
import SearchBar from './SearchBar.jsx';

const MainCalendar = () => {
  const theme = useTheme();
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      _id: '1',
      title: 'Complete Project Report',
      content: 'Need to finish the Q3 project report with all metrics and analysis',
      dueDate: '2025-08-25',
      done: false,
      category: {
        name: 'task',
        color: '#2F6DF9',
        type: 'task',
      },
    },
    {
      _id: '4',
      title: 'Submit Budget Proposal',
      content: 'Prepare and submit Q4 budget proposal to finance team',
      dueDate: '2025-08-27',
      done: true,
      category: {
        name: 'task',
        color: '#2F6DF9',
        type: 'task',
      },
    },
  ]);

  const calendarStyles = useMemo(
    () => ({
      flex: 1,
      mt: 1,
      '& .fc': {
        fontFamily: theme.typography.fontFamily,
      },
      '& .fc-toolbar': {
        marginBottom: '1.5rem',
      },
      '& .fc-toolbar-title': {
        fontSize: '1.5rem',
        fontWeight: '400',
        textTransform: 'capitalize',
        fontFamily: '"playfair-display", serif',
      },
      '& .fc-button': {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.border.default}`,
        color: theme.palette.text.primary,
        padding: '0.375rem 0.875rem',
        fontSize: '0.9rem',
        fontWeight: '400',
        textTransform: 'none',
        borderRadius: '0.25rem',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: '#f5f5f5',
          borderColor: theme.palette.border.strong,
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },
      '& .fc-button-primary:not(:disabled).fc-button-active': {
        backgroundColor: '#f0f0f0',
        color: theme.palette.text.primary,
        borderColor: theme.palette.border.strong,
      },
      '& .fc-button-group': {
        '& .fc-button': {
          marginLeft: '0',
          borderRadius: '0',
        },
        '& .fc-button:first-child': {
          borderRadius: '0.25rem 0 0 0.25rem',
        },
        '& .fc-button:last-child': {
          borderRadius: '0 0.25rem 0.25rem 0',
        },
      },
      '& .fc-today-button': {
        marginLeft: '0.5rem',
        borderRadius: '0.25rem',
        backgroundColor: `${theme.palette.background.paper} !important`,
        border: `1px solid ${theme.palette.border.default} !important`,
        color: `${theme.palette.text.primary} !important`,
        '&:hover': {
          backgroundColor: '#f5f5f5',
          borderColor: `${theme.palette.border.strong} !important`,
        },
        '&:disabled': {
          backgroundColor: `${theme.palette.background.paper} !important`,
          opacity: '0.65',
        },
      },
      '& .fc-theme-standard td, & .fc-theme-standard th': {
        border: `1px solid ${theme.palette.border.default}`,
      },
      '& .fc-theme-standard .fc-scrollgrid': {
        border: `1px solid ${theme.palette.border.default}`,
        overflow: 'hidden',
      },
      '& .fc-col-header': {
        backgroundColor: '#f8f8f8',
      },
      '& .fc-col-header-cell': {
        padding: '0.625rem 0',
        fontWeight: '400',
        fontSize: '1rem',
        color: theme.palette.text.secondary,
        textAlign: 'center',
      },
      '& .fc-daygrid-day': {
        backgroundColor: theme.palette.background.paper,
        minHeight: '5.625rem',
        '&:hover': {
          backgroundColor: '#fafafa',
        },
      },
      '& .fc-daygrid-day-frame': {
        padding: '0.5rem',
        minHeight: '5rem',
      },
      '& .fc-daygrid-day-number': {
        fontSize: '0.95rem',
        color: theme.palette.text.primary,
        padding: '0.25rem',
        float: 'left',
      },
      '& .fc-day-today': {
        backgroundColor: 'transparent !important',
      },
      '& .fc-day-today .fc-daygrid-day-number': {
        backgroundColor: theme.palette.text.accent,
        color: theme.palette.background.paper,
        borderRadius: '50%',
        width: '1.625rem',
        height: '1.625rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        float: 'none',
        margin: '0.125rem',
      },
      '& .fc-event': {
        padding: '0.125rem 0.25rem',
        fontSize: '0.8rem',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: '0.9',
        },
      },
      '& .fc-event-title': {
        fontWeight: '500',
      },
      '& .fc-daygrid-event-dot': {
        display: 'none',
      },
      '& .fc-daygrid-day-events': {
        marginTop: '0.125rem',
      },
    }),
    [theme],
  );

  const handleEventClick = (info) => {
    setSelectedEventId(info.event.id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEventId(null);
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event._id === eventId ? { ...event, done: newStatus } : event)),
    );
  };

  const currentEvent = selectedEventId
    ? events.find((event) => event._id === selectedEventId)
    : null;

  const formattedEvent = currentEvent
    ? {
        id: currentEvent._id,
        title: currentEvent.title,
        start: currentEvent.dueDate,
        extendedProps: {
          content: currentEvent.content,
          done: currentEvent.done,
          categoryName: currentEvent.category.name,
          categoryColor: currentEvent.category.color,
          categoryType: currentEvent.category.type,
        },
      }
    : null;

  const mockEvents = events.map((event) => ({
    id: event._id,
    title: event.title,
    start: event.dueDate,
    backgroundColor: event.done ? theme.palette.text.secondary : event.category.color,
    borderColor: event.done ? theme.palette.text.secondary : event.category.color,
    textColor: theme.palette.background.paper,
    extendedProps: {
      content: event.content,
      done: event.done,
      categoryName: event.category.name,
      categoryType: event.category.type,
      categoryColor: event.category.color,
    },
  }));

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SearchBar />

      <Box sx={calendarStyles}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          events={mockEvents}
          height="100%"
          contentHeight="auto"
          aspectRatio={1.8}
          weekends={true}
          dayHeaderFormat={{ weekday: 'short' }}
          eventDisplay="block"
          dayMaxEvents={3}
          moreLinkClick="popover"
          eventClick={handleEventClick}
        />
      </Box>

      <EventModal
        open={modalOpen}
        onClose={handleCloseModal}
        event={formattedEvent}
        onStatusChange={handleStatusChange}
      />
    </Paper>
  );
};

export default MainCalendar;
