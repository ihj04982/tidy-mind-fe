import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CATEGORIES } from '../constants/note.constants';
import { updateNote } from '../features/notes/noteSlice';

export const useNoteEditor = (note) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    setIsEditing(false);
    setDraft(null);
  }, [note?._id]);

  const requiresCompletion =
    (isEditing ? draft?.categoryName : note?.category?.name) === 'Task' ||
    (isEditing ? draft?.categoryName : note?.category?.name) === 'Reminder';

  const handleEdit = () => {
    setIsEditing(true);
    setDraft({
      title: note.title || '',
      content: note.content || '',
      categoryName: note.category?.name || '',
      dueDate: note.completion?.dueDate ? new Date(note.completion.dueDate) : null,
      isCompleted: note.completion?.isCompleted || false,
      images: [...(note.images || [])],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const noteData = {
      title: isEditing ? draft.title : note.title,
      content: isEditing ? draft.content : note.content,
      images: isEditing ? draft.images : note.images,
      category: {
        name: isEditing ? draft.categoryName : note.category.name,
        color:
          CATEGORIES[(isEditing ? draft.categoryName : note.category.name).toUpperCase()]?.color ||
          CATEGORIES.OTHER.color,
      },
    };

    if (requiresCompletion) {
      noteData.completion = isEditing
        ? { dueDate: draft.dueDate, isCompleted: draft.isCompleted }
        : { dueDate: note.completion?.dueDate, isCompleted: note.completion?.isCompleted };
    } else {
      noteData.completion = null;
    }

    dispatch(updateNote({ noteId: note._id, noteData }));
    setIsEditing(false);
    setDraft(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft(null);
  };

  const handleDeleteImage = (imageIndex) => {
    if (!isEditing) return;
    setDraft((prev) => ({
      ...prev,
      images: (prev?.images || []).filter((_, index) => index !== imageIndex),
    }));
  };

  const handleAddImage = (imageUrl) => {
    if (!isEditing) return;
    setDraft((prev) => ({
      ...prev,
      images: [...(prev?.images || []), imageUrl],
    }));
  };

  return {
    isEditing,
    draft,
    setDraft,
    requiresCompletion,
    handleEdit,
    handleSave,
    handleCancel,
    handleDeleteImage,
    handleAddImage,
  };
};
