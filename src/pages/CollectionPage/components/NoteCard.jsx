import { Box, Typography, Chip, IconButton, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Trash2 } from 'lucide-react';
import React from 'react';

import { CATEGORIES } from '../../../constants/note.constants';
import { formatRelativeDate } from '../../../utils/dateUtils';

const NoteCard = ({ note, isSelected, onSelect, onToggleDone, onDeleteNote }) => {
  const theme = useTheme();

  const category = Object.values(CATEGORIES).find((cat) => cat.id === note.categoryId);
  const isWithDateType = category?.type === 'withDate';

  const handleClick = () => {
    onSelect(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDeleteNote) {
      onDeleteNote(note._id);
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();

    if (onToggleDone) {
      onToggleDone(note._id, !note.dateMeta?.done);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        padding: 2,
        borderBottom: `1px solid ${theme.palette.border.default}`,
        backgroundColor: isSelected ? theme.palette.background.default : 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 0.5 }}>
            {isWithDateType && (
              <Checkbox
                checked={note.dateMeta?.done || false}
                onChange={handleCheckboxClick}
                size="small"
                sx={{ padding: 0, marginRight: 0.5 }}
              />
            )}
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: note.dateMeta?.done ? 'line-through' : 'none',
                opacity: note.dateMeta?.done ? 0.6 : 1,
              }}
            >
              {note.title}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              marginBottom: 1,
            }}
          >
            {note.content}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={category?.name || 'Unknown'}
              size="small"
              sx={{
                backgroundColor: category?.color || '#737373',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                height: '20px',
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, fontSize: '0.625rem' }}
            >
              {formatRelativeDate(note.createdAt)}
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={handleDelete} size="small">
          <Trash2 size={14} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NoteCard;
