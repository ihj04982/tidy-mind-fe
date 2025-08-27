import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ZoomIn, X, Plus } from 'lucide-react';
import React from 'react';

import CloudinaryUploadWidget from '../../../utils/CloudinaryUploadWidget';

const NoteAttachments = ({
  images = [],
  isEditing = false,
  onDeleteImage,
  onImageClick,
  onAddImage,
}) => {
  const theme = useTheme();

  return (
    <>
      <Typography
        sx={{
          borderTop: `1px solid ${theme.palette.border.default}`,
          paddingTop: 3,
          paddingInline: 3,
          color: theme.palette.text.secondary,
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        ATTACHMENTS ({images.length})
      </Typography>

      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          padding: 2,
        }}
      >
        {images.map((image, idx) => (
          <Grid
            key={idx}
            size={{ xs: 4, sm: 2.4, md: 4, lg: 2.4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                overflow: 'visible',
                boxShadow: '1px 1px 3px #00000037',
              }}
            >
              <Box
                onClick={() => onImageClick?.(image)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:hover img': { transform: 'scale(1.05)' },
                  '&:hover .zoom-icon': { opacity: 1 },
                }}
              >
                <img
                  src={image}
                  alt={`image ${idx}`}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                />

                <Box
                  className="zoom-icon"
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: '4px',
                  }}
                >
                  <ZoomIn size={'1.2rem'} />
                </Box>
              </Box>

              {isEditing && (
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => onDeleteImage?.(idx)}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    borderRadius: '50%',
                    minWidth: 'auto',
                    width: '20px',
                    height: '20px',
                    padding: '0',
                  }}
                >
                  <X size={12} />
                </Button>
              )}
            </Box>
          </Grid>
        ))}

        {isEditing && images.length < 5 && (
          <Grid
            size={{ xs: 4, sm: 2.4, md: 4, lg: 2.4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <CloudinaryUploadWidget uploadImage={onAddImage}>
              {(openWidget) => (
                <Box
                  onClick={openWidget}
                  sx={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#666',
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <Plus size={24} color={theme.palette.text.secondary} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.7rem',
                      marginTop: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    Add Image
                  </Typography>
                </Box>
              )}
            </CloudinaryUploadWidget>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NoteAttachments;
