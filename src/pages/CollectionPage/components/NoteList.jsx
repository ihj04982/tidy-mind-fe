import { Box, Typography, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import NoteCard from './NoteCard';
import { CATEGORIES } from '../../../constants/note.constants';
import { groupNotesByDate } from '../../../utils/dateUtils';

const NoteList = ({ notes, selectedNote, onNoteSelect, onCategoryFilter }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const groupedNotes = groupNotesByDate(notes);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategoryFilter(categoryId);
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
            variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick('all')}
            size="small"
            color={theme.palette.text.secondary}
            sx={{
              fontSize: '0.75rem',
              backgroundColor:
                selectedCategory === 'all' ? theme.palette.text.secondary : 'transparent',
              color: selectedCategory === 'all' ? '#FFFFFF' : theme.palette.text.secondary,
              fontWeight: selectedCategory === 'all' ? 600 : 400,
              borderRadius: '14px',
            }}
          >
            All
          </Button>
          {Object.values(CATEGORIES).map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleCategoryClick(category.id)}
                color={category.color}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: isSelected && category.color,
                  color: isSelected ? '#FFFFFF' : category.color,
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
      </Box>
    </Box>
  );
};

export default NoteList;
