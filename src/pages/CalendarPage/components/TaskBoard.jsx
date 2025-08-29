import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateNote, deleteNote, getStatics } from '../../../features/notes/noteSlice';
import { formatRelativeDate } from '../../../utils/dateUtils';

const TaskBoard = ({ statics, currentDate }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const filteredList = React.useMemo(() => {
    if (!statics?.monthlyNotes) return [];
    const toTs = (d) => {
      const t = d ? Date.parse(d) : NaN;
      return Number.isFinite(t) ? t : Number.POSITIVE_INFINITY;
    };
    return [...statics.monthlyNotes].sort((a, b) => {
      if (!!a.completion?.isCompleted !== !!b.completion?.isCompleted) {
        return a.completion?.isCompleted ? 1 : -1;
      }

      return toTs(a.completion?.dueDate) - toTs(b.completion?.dueDate);
    });
  }, [statics?.monthlyNotes]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const todaysTasks = filteredList.filter((note) => {
    const dueDate = new Date(note.completion?.dueDate);
    return dueDate >= today && dueDate < tomorrow;
  });

  const tomorrowsTasks = filteredList.filter((note) => {
    const dueDate = new Date(note.completion?.dueDate);
    return dueDate >= tomorrow && dueDate < dayAfterTomorrow;
  });

  const pastTasks = filteredList.filter((note) => {
    const dueDate = new Date(note.completion?.dueDate);
    return dueDate < today;
  });

  const upcomingTasks = filteredList.filter((note) => {
    const dueDate = new Date(note.completion?.dueDate);
    return dueDate >= dayAfterTomorrow;
  });

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

  const handleDelete = (noteId) => {
    dispatch(deleteNote(noteId)).then(() => {
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
        maxHeight: { xs: '25rem', md: '33.6275rem' },
        height: { xs: 'auto', md: '100%' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        fontSize="1rem"
        fontWeight={600}
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
            width: '0.25rem',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e8ebf0af',
            borderRadius: '0.1875rem',
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
            {todaysTasks.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: theme.palette.category.reminder,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.5rem 0 0.25rem 0',
                    borderBottom: `1px solid ${theme.palette.border.default}`,
                  }}
                >
                  Today
                </Typography>
                {todaysTasks.map((note) => (
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(note._id)}
                            sx={{
                              padding: '0.25rem',
                              color: theme.palette.text.secondary,
                              '&:hover': {
                                color: theme.palette.error.main,
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
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
                              textDecoration: note.completion?.isCompleted
                                ? 'line-through'
                                : 'none',
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
                          {note.completion?.dueDate
                            ? formatRelativeDate(note.completion.dueDate)
                            : ''}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              </>
            )}

            {tomorrowsTasks.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: theme.palette.category.task,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.5rem 0 0.25rem 0',
                    borderBottom: `1px solid ${theme.palette.border.default}`,
                    marginTop: todaysTasks.length > 0 ? '0.5rem' : 0,
                  }}
                >
                  Tomorrow
                </Typography>
                {tomorrowsTasks.map((note) => (
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(note._id)}
                            sx={{
                              padding: '0.25rem',
                              color: theme.palette.text.secondary,
                              '&:hover': {
                                color: theme.palette.error.main,
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
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
                              textDecoration: note.completion?.isCompleted
                                ? 'line-through'
                                : 'none',
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
                          {note.completion?.dueDate
                            ? formatRelativeDate(note.completion.dueDate)
                            : ''}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              </>
            )}

            {upcomingTasks.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.5rem 0 0.25rem 0',
                    borderBottom: `1px solid ${theme.palette.border.default}`,
                    marginTop: todaysTasks.length > 0 || tomorrowsTasks.length > 0 ? '0.5rem' : 0,
                  }}
                >
                  Upcoming
                </Typography>
                {upcomingTasks.map((note) => (
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(note._id)}
                            sx={{
                              padding: '0.25rem',
                              color: theme.palette.text.secondary,
                              '&:hover': {
                                color: theme.palette.error.main,
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
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
                              textDecoration: note.completion?.isCompleted
                                ? 'line-through'
                                : 'none',
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
                          {note.completion?.dueDate
                            ? formatRelativeDate(note.completion.dueDate)
                            : ''}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              </>
            )}

            {pastTasks.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: theme.palette.error.main,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.5rem 0 0.25rem 0',
                    borderBottom: `1px solid ${theme.palette.border.default}`,
                    marginTop:
                      todaysTasks.length > 0 ||
                      tomorrowsTasks.length > 0 ||
                      upcomingTasks.length > 0
                        ? '0.5rem'
                        : 0,
                  }}
                >
                  Past
                </Typography>
                {pastTasks.map((note) => (
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(note._id)}
                            sx={{
                              padding: '0.25rem',
                              color: theme.palette.text.secondary,
                              '&:hover': {
                                color: theme.palette.error.main,
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
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
                              textDecoration: note.completion?.isCompleted
                                ? 'line-through'
                                : 'none',
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
                          {note.completion?.dueDate
                            ? formatRelativeDate(note.completion.dueDate)
                            : ''}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              </>
            )}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default TaskBoard;
