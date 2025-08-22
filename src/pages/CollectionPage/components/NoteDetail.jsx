import { Box, Typography, Chip, IconButton, TextField, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowLeft, Edit2, Save, X, Calendar, Trash, Clock, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

import { CATEGORIES } from '../../../constants/note.constants';
import { formatDate, formatTime, formatDueDate } from '../../../utils/dateUtils';

const NoteDetail = ({ note, onBack, isMobile }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note?.content || '');
  const [editedTitle, setEditedTitle] = useState(note?.title || '');
  const [editedCategoryId, setEditedCategoryId] = useState(note?.categoryId || '');
  const [editedDueDate, setEditedDueDate] = useState(
    note?.withDate && note?.dateMeta?.dueDate ? new Date(note.dateMeta.dueDate) : null,
  );

  const category = note
    ? Object.values(CATEGORIES).find((cat) => cat.id === note.categoryId)
    : null;

  if (!note) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.text.secondary,
          padding: 3,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Select a note to view
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Choose a note from the list to see its details and edit content
        </Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(note.content);
    setEditedTitle(note.title || '');
    setEditedCategoryId(note.categoryId || '');
    setEditedDueDate(
      note.withDate && note.dateMeta?.dueDate ? new Date(note.dateMeta.dueDate) : null,
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving with data:', {
      content: editedContent,
      title: editedTitle,
      categoryId: editedCategoryId,
      dueDate: editedDueDate,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(note.content);
    setEditedTitle(note.title || '');
    setEditedCategoryId(note.categoryId || '');
    setEditedDueDate(
      note.withDate && note.dateMeta?.dueDate ? new Date(note.dateMeta.dueDate) : null,
    );
  };

  const handleDelete = () => {
    console.log('delete');
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
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isEditing ? (
              <>
                <IconButton onClick={handleDelete} size="small">
                  <Trash size={18} />
                </IconButton>
                <IconButton onClick={handleEdit} size="small">
                  <Edit2 size={18} />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={handleSave} size="small" color="primary">
                  <Save size={18} />
                </IconButton>
                <IconButton onClick={handleCancel} size="small">
                  <X size={18} />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          {isEditing ? (
            <Select
              value={editedCategoryId}
              onChange={(e) => setEditedCategoryId(e.target.value)}
              size="small"
              sx={{
                fontSize: '0.75rem',
                minWidth: '120px',
                '& .MuiSelect-select': {
                  padding: '2px 8px',
                },
              }}
            >
              {Object.values(CATEGORIES).map((category) => (
                <MenuItem key={category.id} value={category.id} sx={{ fontSize: '0.75rem' }}>
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
                color: '#FFFFFF',
                fontSize: '0.75rem',
                height: '24px',
              }}
            />
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Calendar size={14} color={theme.palette.text.secondary} />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
            >
              {formatDate(note.createdAt)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Clock size={14} color={theme.palette.text.secondary} />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
            >
              {formatTime(note.createdAt)}
            </Typography>
          </Box>

          {note.withDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AlertCircle size={14} color={theme.palette.text.secondary} />
              {isEditing ? (
                <input
                  type="date"
                  value={editedDueDate ? editedDueDate.toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    setEditedDueDate(e.target.value ? new Date(e.target.value) : null)
                  }
                  style={{
                    fontSize: '0.75rem',
                    height: '24px',
                    border: `1px solid ${theme.palette.border.default}`,
                    borderRadius: '4px',
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}
                >
                  {note.dateMeta ? formatDueDate(note.dateMeta.dueDate) : 'No due date'}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1, padding: 3, overflow: 'auto' }}>
        {isEditing ? (
          <TextField
            multiline
            fullWidth
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',
                lineHeight: 1.6,
              },
            }}
            minRows={20}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {note.content}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NoteDetail;
