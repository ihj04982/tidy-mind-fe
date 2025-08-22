import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'M/d/yyyy');
};

export const formatTime = (date) => {
  return format(new Date(date), 'hh:mm a');
};

export const formatRelativeDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDueDate = (dueDate) => {
  return `Due ${formatRelativeDate(dueDate)}`;
};

export const getDateGroup = (date) => {
  const now = new Date();
  const noteDate = new Date(date);
  const diffTime = now - noteDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return 'Previous 7 Days';
  return 'Older';
};

export const groupNotesByDate = (notes) => {
  const groups = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: [],
  };

  notes.forEach((note) => {
    const group = getDateGroup(note.createdAt);
    groups[group].push(note);
  });

  return groups;
};
