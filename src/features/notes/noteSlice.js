import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api, extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

const initialState = {
  notes: [],
  selectedNote: null,
  error: null,
};

// 노트 목록 조회
export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async ({ category, isCompleted }, { dispatch }) => {
    try {
      const params = {};
      if (category) params.category = category;
      if (isCompleted !== undefined) params.isCompleted = isCompleted;

      const { data } = await api.get('/notes', { params });
      return data.notes;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      throw error;
    }
  },
);

// 노트 상세 조회
export const getNote = createAsyncThunk('notes/getNote', async (noteId, { dispatch }) => {
  try {
    const { data } = await api.get(`/notes/${noteId}`);
    return data.note;
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    dispatch(showToast({ message: errorMessage, severity: 'error' }));
    throw error;
  }
});

// 노트 생성
export const createNote = createAsyncThunk('notes/createNote', async (noteData, { dispatch }) => {
  try {
    const { data } = await api.post('/notes', noteData);
    dispatch(showToast({ message: data.message, severity: 'success' }));
    return data.note;
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    dispatch(showToast({ message: errorMessage, severity: 'error' }));
    throw error;
  }
});

// 노트 수정
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, noteData }, { dispatch }) => {
    try {
      const { data } = await api.put(`/notes/${noteId}`, noteData);
      dispatch(showToast({ message: data.message, severity: 'success' }));
      return data.note;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      throw error;
    }
  },
);

// 노트 삭제
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId, { dispatch }) => {
  try {
    const { data } = await api.delete(`/notes/${noteId}`);
    dispatch(showToast({ message: data.message, severity: 'success' }));
    return noteId;
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    dispatch(showToast({ message: errorMessage, severity: 'error' }));
    throw error;
  }
});

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },
    clearSelectedNote(state) {
      state.selectedNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 노트 목록 조회
      .addCase(getNotes.pending, (state) => {
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.error = null;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 노트 상세 조회
      .addCase(getNote.pending, (state) => {
        state.error = null;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.error = null;
        state.selectedNote = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 노트 생성
      .addCase(createNote.pending, (state) => {
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.error = null;
        state.notes.unshift(action.payload);
        state.selectedNote = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 노트 수정
      .addCase(updateNote.pending, (state) => {
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.error = null;
        const updatedNote = action.payload;
        const index = state.notes.findIndex((note) => note._id === updatedNote._id);
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
        if (state.selectedNote?._id === updatedNote._id) {
          state.selectedNote = updatedNote;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 노트 삭제
      .addCase(deleteNote.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.error = null;
        const deletedNoteId = action.payload;
        state.notes = state.notes.filter((note) => note._id !== deletedNoteId);
        if (state.selectedNote?._id === deletedNoteId) {
          state.selectedNote = null;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedNote, clearSelectedNote } = noteSlice.actions;
export default noteSlice.reducer;
