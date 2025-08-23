import { Container, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';

import NoteDetail from './components/NoteDetail';
import NoteList from './components/NoteList';
import { mockNotes } from '../../constants/note.constants';

const CollectionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedNote, setSelectedNote] = useState(mockNotes[0]);
  const [filteredNotes, setFilteredNotes] = useState(mockNotes);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === 'all') {
      setFilteredNotes(mockNotes);
    } else {
      setFilteredNotes(mockNotes.filter((note) => note.categoryId === categoryId));
    }
  };

  const handleToggleDone = (noteId, done) => {
    setFilteredNotes((prev) =>
      prev.map((note) =>
        note._id === noteId
          ? {
              ...note,
              dateMeta: {
                ...note.dateMeta,
                done,
              },
            }
          : note,
      ),
    );

    if (selectedNote?._id === noteId) {
      setSelectedNote((prev) => ({
        ...prev,
        dateMeta: {
          ...prev.dateMeta,
          done,
        },
      }));
    }

    console.log(`Note ${noteId} done status changed to: ${done}`);
  };

  const handleDeleteNote = (noteId) => {
    setFilteredNotes((prev) => prev.filter((note) => note._id !== noteId));
    setSelectedNote(null);
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
              onBack={() => setSelectedNote(null)}
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
              notes={filteredNotes}
              selectedNote={selectedNote}
              onNoteSelect={handleNoteSelect}
              onCategoryFilter={handleCategoryFilter}
              onToggleDone={handleToggleDone}
              onDeleteNote={handleDeleteNote}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CollectionPage;
