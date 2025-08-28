import { Box, Chip, Divider, Modal, Switch, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const EventModal = ({ open, onClose, event, onStatusChange }) => {
  const theme = useTheme();

  if (!event) return null;

  const handleStatusChange = (e) => {
    e.stopPropagation();
    onStatusChange(event.id, !event.extendedProps.done);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 450 },
    maxWidth: '90vw',
    bgcolor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.default}`,
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    outline: 'none',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Typography
            id="event-modal-title"
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              flex: 1,
              pr: 2,
            }}
          >
            {event.title}
          </Typography>
          <Chip
            label={event.extendedProps.categoryName}
            size="small"
            sx={{
              backgroundColor: event.extendedProps.categoryColor,
              color: theme.palette.background.paper,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Due Date
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.95rem',
            }}
          >
            {formatDate(event.start)}
          </Typography>
        </Box>

        {event.extendedProps.content && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Description
            </Typography>
            <Typography
              id="event-modal-description"
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              {event.extendedProps.content}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Status:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: event.extendedProps.done
                  ? theme.palette.text.accent
                  : theme.palette.text.primary,
                fontWeight: event.extendedProps.done ? 500 : 400,
                fontSize: '0.875rem',
              }}
            >
              {event.extendedProps.done ? 'Completed' : 'Pending'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              Mark as done
            </Typography>
            <Switch
              checked={event.extendedProps.done}
              onChange={handleStatusChange}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: theme.palette.text.accent,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme.palette.text.accent,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

EventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    start: PropTypes.string,
    extendedProps: PropTypes.shape({
      content: PropTypes.string,
      done: PropTypes.bool,
      categoryName: PropTypes.string,
      categoryColor: PropTypes.string,
      categoryType: PropTypes.string,
    }),
  }),
  onStatusChange: PropTypes.func.isRequired,
};

export default EventModal;
