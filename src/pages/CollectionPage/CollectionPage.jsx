import { Box, Grid, Paper } from '@mui/material';
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

  return (
    <Box
      sx={{
        minHeight: '100%',
        backgroundColor: theme.palette.background.default,
        padding: { xs: 2, md: 3 },
      }}
    >
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid
          size={{ xs: 12, md: 6, lg: 7 }}
          sx={{
            display: {
              xs: selectedNote ? 'block' : 'none',
              md: 'block',
            },
          }}
        >
          <Paper
            sx={{
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <NoteDetail
              note={selectedNote}
              onBack={() => setSelectedNote(null)}
              isMobile={isMobile}
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
          }}
        >
          <Paper
            sx={{
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <NoteList
              notes={filteredNotes}
              selectedNote={selectedNote}
              onNoteSelect={handleNoteSelect}
              onCategoryFilter={handleCategoryFilter}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollectionPage;
