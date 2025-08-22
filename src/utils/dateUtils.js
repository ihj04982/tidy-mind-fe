import {
  format,
  formatDistanceToNow,
  differenceInCalendarDays,
  isToday,
  isYesterday,
  isThisWeek,
} from 'date-fns';

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
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = differenceInCalendarDays(due, now);

  if (diffDays < 0) {
    return `Overdue ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${diffDays} days`;
  }
};

export const formatDateForInput = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const getDateGroup = (date) => {
  const noteDate = new Date(date);

  if (isToday(noteDate)) return 'Today';
  if (isYesterday(noteDate)) return 'Yesterday';
  if (isThisWeek(noteDate)) return 'Previous 7 Days';
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
