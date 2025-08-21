import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import React from 'react';

import SearchBar from './SearchBar.jsx';

const MainCalendar = () => {
  const mockCategories = [
    {
      _id: 'cat1',
      userId: 'user123',
      name: 'task',
      color: '#3ac6dd',
      type: 'task',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: 'cat2',
      userId: 'user123',
      name: 'reminder',
      color: '#57e578',
      type: 'general',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: 'cat3',
      userId: 'user123',
      name: 'birthday',
      color: '#d8e572',
      type: 'general',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ];

  const mockNotes = [
    {
      _id: '1',
      userId: 'user123',
      title: 'Complete Project Report',
      content: 'Need to finish the Q3 project report with all metrics and analysis',
      categoryId: 'cat1',
      withDate: true,
      dateMeta: {
        dueDate: '2025-08-25',
        done: false,
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      userId: 'user123',
      title: '지현 생일',
      content: '지현 생일: 8월 24일',
      categoryId: 'cat3',
      withDate: true,
      dateMeta: {
        dueDate: '2025-08-24',
        done: false,
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: '3',
      userId: 'user123',
      title: '마라톤',
      content: '마라톤 경기',
      categoryId: 'cat2',
      withDate: false,
      dateMeta: {
        dueDate: '2025-08-26',
        done: true,
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: '4',
      userId: 'user123',
      title: 'Submit Budget Proposal',
      content: 'Prepare and submit Q4 budget proposal to finance team',
      categoryId: 'cat1',
      withDate: true,
      dateMeta: {
        dueDate: '2025-08-27',
        done: true,
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      _id: '5',
      userId: 'user123',
      title: 'Team Meeting Prep',
      content: 'Prepare agenda for weekly team sync',
      categoryId: 'cat3',
      withDate: true,
      dateMeta: {
        dueDate: '2025-08-28',
        done: true,
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ];

  const getCategoryById = (categoryId) => {
    return mockCategories.find((cat) => cat._id === categoryId);
  };

  const mockEvents = mockNotes
    .filter((note) => {
      if (!note.withDate || !note.dateMeta?.dueDate) return false;

      const category = getCategoryById(note.categoryId);
      if (!category || category.type !== 'task') return false;

      return true;
    })
    .map((note) => {
      const category = getCategoryById(note.categoryId);
      return {
        id: note._id,
        title: note.title,
        start: note.dateMeta.dueDate,
        backgroundColor: note.dateMeta.done ? '#9E9E9E' : category.color,
        borderColor: note.dateMeta.done ? '#9E9E9E' : category.color,
        textColor: 'white',
        extendedProps: {
          content: note.content,
          done: note.dateMeta.done,
          categoryName: category.name,
          categoryType: category.type,
          categoryColor: category.color,
        },
      };
    });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SearchBar />

      <Box
        sx={{
          flex: 1,
          '& .fc': {
            fontFamily: '"noto-sans", sans-serif',
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
            backgroundColor: 'white',
            border: '1px solid #ddd',
            color: '#333',
            padding: '6px 14px',
            fontSize: '0.9rem',
            fontWeight: '400',
            textTransform: 'none',
            borderRadius: '4px',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: '#ccc',
            },
            '&:focus': {
              boxShadow: 'none',
            },
          },
          '& .fc-button-primary:not(:disabled).fc-button-active': {
            backgroundColor: '#f0f0f0',
            color: '#333',
            borderColor: '#999',
          },
          '& .fc-button-group': {
            '& .fc-button': {
              marginLeft: '0',
              borderRadius: '0',
            },
            '& .fc-button:first-child': {
              borderRadius: '4px 0 0 4px',
            },
            '& .fc-button:last-child': {
              borderRadius: '0 4px 4px 0',
            },
          },

          '& .fc-today-button': {
            marginLeft: '8px',
            borderRadius: '4px',
            backgroundColor: 'white !important',
            border: '1px solid #ddd !important',
            color: '#333 !important',
            '&:hover': {
              backgroundColor: '#f5f5f5 !important',
              borderColor: '#ccc !important',
            },
            '&:disabled': {
              backgroundColor: 'white !important',
              opacity: '0.65',
            },
          },
          '& .fc-theme-standard td, & .fc-theme-standard th': {
            border: '1px solid #ddd',
          },
          '& .fc-theme-standard .fc-scrollgrid': {
            border: '1px solid #ddd',
            overflow: 'hidden',
          },
          '& .fc-col-header': {
            backgroundColor: '#f8f8f8',
          },
          '& .fc-col-header-cell': {
            padding: '10px 0',
            fontWeight: '400',
            fontSize: '1rem',
            color: '#666',
            textAlign: 'center',
          },
          '& .fc-daygrid-day': {
            backgroundColor: 'white',
            minHeight: '90px',
            '&:hover': {
              backgroundColor: '#fafafa',
            },
          },
          '& .fc-daygrid-day-frame': {
            padding: '8px',
            minHeight: '80px',
          },
          '& .fc-daygrid-day-number': {
            fontSize: '0.95rem',
            color: '#333',
            padding: '4px',
            float: 'left',
          },
          '& .fc-day-today': {
            backgroundColor: 'transparent !important',
          },
          '& .fc-day-today .fc-daygrid-day-number': {
            backgroundColor: '#ff6900',
            color: 'white',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '500',
            float: 'none',
            margin: '2px',
          },
          '& .fc-event': {
            padding: '2px 4px',
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
            marginTop: '2px',
          },
        }}
      >
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
        />
      </Box>
    </Box>
  );
};

export default MainCalendar;
