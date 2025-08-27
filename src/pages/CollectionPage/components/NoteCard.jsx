import { Box, Typography, Chip, IconButton, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Image, Trash2 } from 'lucide-react';
import React from 'react';

import { formatRelativeDate } from '../../../utils/dateUtils';

const NoteCard = ({ note, isSelected, onSelect, onToggleDone, onDeleteNote }) => {
  const theme = useTheme();

  const category = note.category;
  const hasCompletion = note.completion !== null;

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
      onToggleDone(note._id, !note.completion?.isCompleted);
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
            {hasCompletion && (
              <Checkbox
                checked={note.completion?.isCompleted || false}
                onChange={handleCheckboxClick}
                size="small"
                sx={{ padding: 0, marginRight: 0.5 }}
              />
            )}
            <Typography
              variant="subtitle2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: note.completion?.isCompleted ? 'line-through' : 'none',
                opacity: note.completion?.isCompleted ? 0.6 : 1,
              }}
            >
              {note.title}
            </Typography>
            {note.images.length > 0 && (
              <Image size={'1rem'} strokeWidth={1.7} color={theme.palette.border.strong} />
            )}
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
