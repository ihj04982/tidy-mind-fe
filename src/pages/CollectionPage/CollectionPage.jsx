import { Container, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NoteDetail from './components/NoteDetail';
import NoteList from './components/NoteList';
import {
  getNotes,
  clearSelectedNote,
  updateNote,
  deleteNote,
  getNote,
} from '../../features/notes/noteSlice';

const CollectionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const { notes, selectedNote, loading } = useSelector((state) => state.notes);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    const params = currentCategory === 'all' ? {} : { category: currentCategory };
    dispatch(getNotes(params));
  }, [dispatch, currentCategory]);

  const handleNoteSelect = (note) => {
    dispatch(getNote(note._id));
  };

  const handleCategoryFilter = (categoryName) => {
    setCurrentCategory(categoryName);
  };

  const handleToggleDone = (noteId, isCompleted) => {
    dispatch(
      updateNote({
        noteId,
        noteData: {
          completion: {
            isCompleted,
          },
        },
      }),
    );
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  return (
    <Container
      sx={{
        my: 10,
        height: 'calc(100vh - 100px)',
        maxHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={3} sx={{ height: '100%', flex: 1, minHeight: 0, maxHeight: '100%' }}>
        <Grid
          size={{ xs: 12, md: 6, lg: 7 }}
          sx={{
            display: {
              xs: selectedNote ? 'block' : 'none',
              md: 'block',
            },
            height: '100%',
            maxHeight: '100%',
          }}
        >
          <Paper
            sx={{
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <NoteDetail
              note={selectedNote}
              isLoading={loading}
              onBack={() => dispatch(clearSelectedNote())}
              isMobile={isMobile}
              onToggleDone={handleToggleDone}
              onDeleteNote={handleDeleteNote}
            />
          </Paper>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6, lg: 5 }}
          sx={{
            display: {
              xs: selectedNote ? 'none' : 'block',
              md: 'block',
            },
            height: '100%',
            maxHeight: '100%',
          }}
        >
          <Paper
            sx={{
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <NoteList
              notes={notes}
              selectedNote={selectedNote}
              isLoading={loading}
              onNoteSelect={handleNoteSelect}
              onCategoryFilter={handleCategoryFilter}
              onToggleDone={handleToggleDone}
              onDeleteNote={handleDeleteNote}
              currentCategory={currentCategory}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CollectionPage;
