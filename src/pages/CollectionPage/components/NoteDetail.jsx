import { Box, Typography, TextField, Dialog, IconButton, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { X } from 'lucide-react';
import React, { useState } from 'react';

import NoteAttachments from './NoteAttachments';
import NoteDetailHeader from './NoteDetailHeader';
import { useNoteEditor } from '../../../hooks/useNoteEditor';

const NoteDetail = ({ note, isLoading = false, onBack, isMobile, onDeleteNote, onToggleDone }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    isEditing,
    draft,
    setDraft,
    requiresCompletion,
    handleEdit,
    handleSave,
    handleCancel,
    handleDeleteImage,
    handleAddImage,
  } = useNoteEditor(note);

  const contentValue = isEditing ? draft?.content || '' : note?.content || '';
  const attachmentsImages = isEditing ? draft?.images || [] : note?.images || [];
  const showAttachments = isEditing || attachmentsImages.length > 0;

  const handleContentChange = isEditing
    ? (e) => setDraft((prev) => ({ ...prev, content: e.target.value }))
    : undefined;

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

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

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSave} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <NoteDetailHeader
          note={note}
          isEditing={isEditing}
          draft={draft}
          setDraft={setDraft}
          isMobile={isMobile}
          onBack={onBack}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={onDeleteNote}
          onToggleDone={onToggleDone}
          requiresCompletion={requiresCompletion}
        />
        <Box sx={{ flex: 1, padding: 3, overflow: 'auto', minHeight: 0 }}>
          <TextField
            multiline
            fullWidth
            value={contentValue}
            onChange={handleContentChange}
            readOnly={!isEditing}
            variant="outlined"
            placeholder={isEditing ? 'Write your note content...' : undefined}
            sx={{
              height: '100%',
              '& .MuiOutlinedInput-root': {
                height: '100%',
                alignItems: 'flex-start',
                backgroundColor: isEditing ? undefined : 'transparent',
              },
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',
                lineHeight: isEditing ? undefined : 1.6,
                color: isEditing ? undefined : theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: isEditing ? undefined : 'none',
              },
            }}
          />
        </Box>
      </form>

      {showAttachments && (
        <NoteAttachments
          images={attachmentsImages}
          isEditing={isEditing}
          onDeleteImage={handleDeleteImage}
          onImageClick={(img) => setSelectedImage(img)}
          onAddImage={handleAddImage}
        />
      )}

      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Box>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
              }}
            >
              <X size={20} strokeWidth={3} />
            </IconButton>
          </Box>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="img"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default NoteDetail;
