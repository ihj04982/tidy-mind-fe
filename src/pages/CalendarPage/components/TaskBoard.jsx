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

import { getStatus, updateNote } from '../../../features/notes/noteSlice';
import { formatRelativeDate } from '../../../utils/dateUtils';

const TaskBoard = ({ status, currentDate }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const filteredList = status?.monthlyNotes.filter((note) => note.completion?.isCompleted !== true);

  const handleToggleDone = (noteId, isCompleted) => {
    const note = filteredList.find((n) => n._id === noteId);
    if (!note) return;

    const updatedNote = {
      ...note,
      completion: note.completion
        ? {
            ...note.completion,
            isCompleted,
          }
        : {
            isCompleted,
            dueDate: new Date().toISOString(),
          },
    };

    dispatch(updateNote({ noteId, noteData: updatedNote })).then(() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      dispatch(getStatus({ year, month }));
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
                    <Typography fontSize="0.875rem">{note.title}</Typography>
                    <Checkbox
                      checked={note.completion?.isCompleted || false}
                      onChange={(e) => handleToggleDone(note._id, e.target.checked)}
                      size="small"
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
                      <Typography fontSize="0.8rem" variant="body2" color="text.secondary">
                        {note.content.length > 30
                          ? note.content.slice(0, 30) + '...'
                          : note.content}
                      </Typography>
                    )}
                    <Typography
                      fontSize="0.7rem"
                      color="text.secondary"
                      sx={{ whiteSpace: 'nowrap' }}
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
