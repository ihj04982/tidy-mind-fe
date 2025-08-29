import { Box, Typography, Stack, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import NoteCard from './NoteCard';
import { CATEGORIES } from '../../../constants/note.constants';
import { groupNotesByDate } from '../../../utils/dateUtils';

const NoteList = ({
  notes,
  selectedNote,
  isLoading = false,
  onNoteSelect,
  onCategoryFilter,
  onToggleDone,
  onDeleteNote,
  currentCategory = 'all',
}) => {
  const theme = useTheme();
  const groupedNotes = groupNotesByDate(notes);

  const handleCategoryClick = (categoryName) => {
    onCategoryFilter(categoryName);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          padding: 3,
          borderBottom: `1px solid ${theme.palette.border.default}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.text.primary, marginBottom: 2 }}>
          Collections
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            variant={currentCategory === 'all' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick('all')}
            size="small"
            color="inherit"
            sx={{
              fontSize: '0.75rem',
              backgroundColor:
                currentCategory === 'all' ? theme.palette.text.secondary : 'transparent',
              color: currentCategory === 'all' ? 'white' : theme.palette.text.secondary,
              fontWeight: currentCategory === 'all' ? 600 : 400,
              borderRadius: '14px',
            }}
          >
            All
          </Button>
          {Object.values(CATEGORIES).map((category) => {
            const isSelected = currentCategory === category.name;
            return (
              <Button
                key={category.name}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleCategoryClick(category.name)}
                color="inherit"
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: isSelected ? category.color : 'transparent',
                  color: isSelected ? 'white' : category.color,
                  borderColor: category.color,
                  fontWeight: isSelected ? 600 : 400,
                  borderRadius: '14px',
                }}
              >
                {category.name}
              </Button>
            );
          })}
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {isLoading && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
        {!isLoading && (
          <>
            {Object.entries(groupedNotes).map(([groupName, groupNotes]) => {
              if (groupNotes.length === 0) return null;

              return (
                <Box key={groupName}>
                  <Box
                    sx={{
                      padding: '12px 24px 8px 24px',
                      borderBottom: `1px solid ${theme.palette.border.default}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {groupName}
                    </Typography>
                  </Box>

                  {groupNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      isSelected={selectedNote?._id === note._id}
                      onSelect={onNoteSelect}
                      onToggleDone={onToggleDone}
                      onDeleteNote={onDeleteNote}
                    />
                  ))}
                </Box>
              );
            })}

            {notes.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: theme.palette.text.secondary,
                }}
              >
                <Typography variant="body2">No notes found</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default NoteList;
