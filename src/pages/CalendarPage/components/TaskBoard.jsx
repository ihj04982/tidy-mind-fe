import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateNote, getStatics } from '../../../features/notes/noteSlice';
import { formatRelativeDate } from '../../../utils/dateUtils';

const TaskBoard = ({ statics, currentDate }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Show all tasks, sorted by completion status and due date
  const filteredList = statics?.monthlyNotes
    ? [...statics.monthlyNotes].sort((a, b) => {
        // First: Sort by completion status (incomplete first)
        if (a.completion?.isCompleted !== b.completion?.isCompleted) {
          return a.completion?.isCompleted ? 1 : -1;
        }

        // Second: Sort by due date (nearest first)
        const dateA = new Date(a.completion?.dueDate || '9999-12-31');
        const dateB = new Date(b.completion?.dueDate || '9999-12-31');
        return dateA - dateB;
      })
    : [];

  const handleToggleDone = (noteId, isCompleted) => {
    const updatedNote = {
      completion: {
        isCompleted,
      },
    };

    dispatch(
      updateNote({
        noteId,
        noteData: updatedNote,
      }),
    ).then(() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      dispatch(getStatics({ year, month }));
    });
  };
  return (
    <Paper
      sx={{
        padding: '1.5rem 1rem',
        borderRadius: 2,
        width: '100%',
        maxHeight: { md: '480px' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        fontSize="1rem"
        fontWeight={5600}
        position="sticky"
        sx={{ display: 'flex', flexDirection: 'column', top: 0, zIndex: 1, pb: 2 }}
      >
        <strong>{currentDate.toLocaleString('en-US', { month: 'long' })}</strong>
        <span>Tasks & Reminders</span>
      </Typography>

      <Box
        sx={{
          flex: 1,
          padding: '0 0.25rem',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e8ebf0af',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#9ca3af',
            },
          },
        }}
      >
        {filteredList.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No pending tasks or reminders this month.
          </Typography>
        ) : (
          <List sx={{ padding: 0 }}>
            {filteredList.map((note) => (
              <ListItem
                key={note._id}
                alignItems="flex-start"
                sx={{
                  padding: '0.25rem 0',
                  borderBottom: `1px solid ${theme.palette.border.default}`,
                  opacity: note.completion?.isCompleted ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <ListItemText>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      fontSize="0.875rem"
                      sx={{
                        textDecoration: note.completion?.isCompleted ? 'line-through' : 'none',
                        color: note.completion?.isCompleted
                          ? theme.palette.text.secondary
                          : theme.palette.text.primary,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {note.title}
                    </Typography>
                    <Checkbox
                      checked={note.completion?.isCompleted || false}
                      onChange={(e) => handleToggleDone(note._id, e.target.checked)}
                      size="small"
                      sx={{
                        color: note.category?.color || theme.palette.text.secondary,
                        opacity: note.completion?.isCompleted ? 0.5 : 0.7,
                        '&.Mui-checked': {
                          color: note.category?.color || theme.palette.success.main,
                          opacity: 1,
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {note.content && (
                      <Typography
                        fontSize="0.8rem"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          textDecoration: note.completion?.isCompleted ? 'line-through' : 'none',
                          opacity: note.completion?.isCompleted ? 0.7 : 1,
                        }}
                      >
                        {note.content.length > 30
                          ? note.content.slice(0, 30) + '...'
                          : note.content}
                      </Typography>
                    )}
                    <Typography
                      fontSize="0.7rem"
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'nowrap',
                        textDecoration: note.completion?.isCompleted ? 'line-through' : 'none',
                      }}
                    >
                      {formatRelativeDate(note.completion.dueDate)}
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default TaskBoard;
