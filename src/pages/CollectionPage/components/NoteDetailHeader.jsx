import {
  Box,
  Typography,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowLeft, Edit2, Save, X, Calendar, Trash, Clock, AlertCircle } from 'lucide-react';
import React from 'react';

import { CATEGORIES } from '../../../constants/note.constants';
import { formatDate, formatTime, formatDateForInput } from '../../../utils/dateUtils';

const NoteDetailHeader = ({
  note,
  isEditing,
  draft,
  setDraft,
  isMobile,
  onBack,
  onEdit,
  onCancel,
  onDelete,
  onToggleDone,
  requiresCompletion,
}) => {
  const theme = useTheme();
  const category = note?.category || null;

  const handleTitleChange = (e) => {
    setDraft((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setDraft((prev) => ({ ...prev, categoryName: e.target.value }));
  };

  const handleDueDateChange = (e) => {
    setDraft((prev) => ({
      ...prev,
      dueDate: e.target.value ? new Date(e.target.value) : null,
    }));
  };

  const handleIsCompletedChange = (e) => {
    if (isEditing) {
      setDraft((prev) => ({ ...prev, isCompleted: e.target.checked }));
    } else if (onToggleDone) {
      onToggleDone(note._id, e.target.checked);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderBottom: `1px solid ${theme.palette.border.default}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={onBack} size="small">
              <ArrowLeft size={20} />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isEditing ? (
              <TextField
                value={draft?.title || ''}
                onChange={handleTitleChange}
                variant="standard"
                placeholder="Enter title..."
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  },
                }}
              />
            ) : (
              <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                {note.title || 'Untitled Note'}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {!isEditing ? (
            <>
              <IconButton onClick={onDelete} size="small" color="error">
                <Trash size={18} />
              </IconButton>
              <IconButton onClick={onEdit} size="small">
                <Edit2 size={18} />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton type="submit" size="small" color="primary">
                <Save size={18} />
              </IconButton>
              <IconButton onClick={onCancel} size="small">
                <X size={18} />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          overflow: 'auto',
        }}
      >
        {isEditing ? (
          <Select
            value={draft?.categoryName || ''}
            onChange={handleCategoryChange}
            size="small"
            sx={{
              fontSize: '0.75rem',
              minWidth: '120px',
            }}
          >
            {Object.values(CATEGORIES).map((category) => (
              <MenuItem key={category.name} value={category.name} sx={{ fontSize: '0.75rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: category.color,
                    }}
                  />
                  {category.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Chip
            label={category?.name || 'Unknown'}
            size="small"
            sx={{
              backgroundColor: category?.color || theme.palette.text.secondary,
              color: theme.palette.common.white,
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Calendar size={14} color={theme.palette.text.secondary} />
          <Typography variant="caption">{formatDate(note.createdAt)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Clock size={14} color={theme.palette.text.secondary} />
          <Typography variant="caption">{formatTime(note.createdAt)}</Typography>
        </Box>

        {requiresCompletion && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AlertCircle size={14} color={theme.palette.text.secondary} />
            {isEditing ? (
              <TextField
                type="date"
                value={draft?.dueDate ? formatDateForInput(draft.dueDate) : ''}
                onChange={handleDueDateChange}
                required={requiresCompletion}
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '0.75rem',
                  },
                }}
              />
            ) : (
              <Typography variant="caption">
                {note.completion ? formatDate(note.completion.dueDate) : 'No due date'}
              </Typography>
            )}
          </Box>
        )}

        {requiresCompletion && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isEditing ? !!draft?.isCompleted : note.completion?.isCompleted || false}
                onChange={handleIsCompletedChange}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                Done
              </Typography>
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default NoteDetailHeader;
