import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { alpha, Box, Paper, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import EventModal from './EventModal.jsx';
import { getStatus, updateNote } from '../../../features/notes/noteSlice.js';

const MainCalendar = ({ status, currentDate, onDateChange }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, [theme.palette.mode]);

  // 달력 정보 반영
  const handleDatesSet = (dateInfo) => {
    const newDate = dateInfo.view.currentStart;

    if (onDateChange) {
      onDateChange(newDate);
    }
  };

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
        '& .fc-button:first-of-type': {
          borderRadius: '0.25rem 0 0 0.25rem',
        },
        '& .fc-button:last-of-type': {
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
      '& .fc-popover-header ': {
        background: theme.palette.background.paper,
        fontSize: '0.825rem',
      },
      '& .fc-popover-body ': {
        borderTop: `1px solid ${theme.palette.border.default}`,
        background: alpha(theme.palette.background.paper, 0.9),
      },
      '& .fc-col-header': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .fc-col-header-cell': {
        padding: '0.2rem 0',
        fontWeight: '700',
        fontSize: '0.825rem',
        color: theme.palette.text.secondary,
        textAlign: 'center',
      },
      '& .fc-daygrid-day': {
        backgroundColor: theme.palette.background.paper,
        minHeight: '5.625rem',
      },
      '& .fc-daygrid-day-frame': {
        padding: '0.25rem',
        minHeight: '5rem',
      },
      '& .fc-daygrid-day-number': {
        fontSize: '0.825rem',
        color: theme.palette.text.primary,
        float: 'left',
      },
      '& .fc-daygrid-more-link': {
        fontSize: '0.8rem',
        marginTop: '0.25rem',
      },
      '& .fc-day-today': {
        backgroundColor: 'transparent !important',
      },
      '& .fc-day-today .fc-daygrid-day-number': {
        backgroundColor: theme.palette.text.accent,
        color: theme.palette.background.paper,
        borderRadius: '50%',
        width: '1.5rem',
        height: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        float: 'none',
        marginBottom: '0.125rem',
      },
      '& .fc-event': {
        padding: '0 0.25rem',
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        borderRadius: '1rem',
        marginBottom: '0.125rem',
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
      '& .fc .fc-daygrid-body-natural .fc-daygrid-day-events': {
        marginBottom: '0.25rem',
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
    dispatch(
      updateNote({
        noteId: eventId,
        noteData: {
          completion: { isCompleted: newStatus, dueDate: currentEvent?.completion?.dueDate },
        },
      }),
    ).then(() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      dispatch(getStatus({ year, month }));
    });
  };

  const SimpleEvents = useMemo(() => {
    if (status?.monthlyNotes && Array.isArray(status.monthlyNotes)) {
      const filteredList = status.monthlyNotes
        .map((event) => ({
          id: event._id,
          title: event.title,
          start: event.completion.dueDate,
          backgroundColor: event.completion.isCompleted
            ? theme.palette.border.default
            : event.category.color,
          borderColor: event.completion.isCompleted
            ? theme.palette.border.default
            : event.category.color,
          textColor: theme.palette.text.primary,
          extendedProps: {
            content: event.content,
            done: event.completion.isCompleted,
            categoryName: event.category.name,
            categoryType: event.category.name,
            categoryColor: event.category.color,
          },
        }))
        .filter(
          (note) =>
            note.extendedProps.categoryName === 'Task' ||
            note.extendedProps.categoryName === 'Reminder',
        );

      return filteredList;
    }
    return [];
  }, [status, theme]);

  const currentEvent = selectedEventId
    ? status.monthlyNotes.find((event) => event._id === selectedEventId)
    : null;

  const formattedEvent = currentEvent
    ? {
        id: currentEvent._id,
        title: currentEvent.title,
        start: currentEvent.completion.dueDate,
        extendedProps: {
          content: currentEvent.content,
          done: currentEvent.completion.isCompleted,
          categoryName: currentEvent.category.name,
          categoryColor: currentEvent.category.color,
          categoryType: currentEvent.category.type,
        },
      }
    : null;

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
      <Box sx={calendarStyles}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today',
          }}
          events={SimpleEvents}
          height="100%"
          contentHeight="auto"
          aspectRatio={1.8}
          weekends={true}
          dayHeaderFormat={{ weekday: 'short' }}
          eventDisplay="block"
          dayMaxEvents={isMobile ? 1 : 3}
          moreLinkClick="popover"
          eventClick={handleEventClick}
          displayEventTime={false}
          datesSet={handleDatesSet}
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
