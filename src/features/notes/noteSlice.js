import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api, extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

const initialState = {
  notes: [],
  statics: { monthlyNotes: [], dailyCounts: [], total: 0 },
  selectedNote: null,
  loading: false,
  notesLoading: false,
  noteLoading: false,
  error: null,
};

// 노트 목록 조회
export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async ({ category, isCompleted }, { dispatch, rejectWithValue }) => {
    try {
      const params = {};
      if (category) params.category = category;
      if (isCompleted !== undefined) params.isCompleted = isCompleted;

      const { data } = await api.get('/notes', { params });

      if (data.notes.length > 0) {
        dispatch(getNote(data.notes[0]._id));
      }

      return data.notes;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

// 노트 상세 조회
export const getNote = createAsyncThunk(
  'notes/getNote',
  async (noteId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/notes/${noteId}`);
      return data.note;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

// AI suggestions과 함께 노트 생성
export const createNoteWithSuggestion = createAsyncThunk(
  'notes/createWithSuggestion',
  async ({ content, images = [] }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post('/notes/suggest', { content, images });
      dispatch(showToast({ message: data.message, severity: 'success' }));
      return data.note;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

// 노트 수정
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, noteData }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/notes/${noteId}`, noteData);
      dispatch(showToast({ message: data.message, severity: 'success' }));
      return data.note;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

// 노트 삭제
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/notes/${noteId}`);
      dispatch(showToast({ message: data.message, severity: 'success' }));
      return noteId;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

// 캘린더 통계 조회
export const getStatics = createAsyncThunk(
  'notes/getStatics',
  async (query, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/notes/statics', { params: { ...query } });
      return response.data.data;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      dispatch(showToast({ message: errorMessage, severity: 'error' }));
      return rejectWithValue(errorMessage);
    }
  },
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearSelectedNote(state) {
      state.selectedNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 노트 목록 조회
      .addCase(getNotes.pending, (state) => {
        state.error = null;
        state.notesLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.error = null;
        state.notes = action.payload;
        state.notesLoading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.error = action.payload;
        state.notesLoading = false;
      })

      // 노트 상세 조회
      .addCase(getNote.pending, (state) => {
        state.error = null;
        state.noteLoading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.error = null;
        state.selectedNote = action.payload;
        state.noteLoading = false;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.error = action.payload;
        state.noteLoading = false;
      })

      // AI suggestions과 함께 노트 생성
      .addCase(createNoteWithSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNoteWithSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.notes.unshift(action.payload);
          state.selectedNote = action.payload;
        }
      })
      .addCase(createNoteWithSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 노트 수정
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedNote = action.payload;

        const noteIndex = state.notes.findIndex((note) => note._id === updatedNote._id);
        if (noteIndex !== -1) {
          state.notes[noteIndex] = updatedNote;
        }

        if (state.selectedNote?._id === updatedNote._id) {
          state.selectedNote = updatedNote;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 노트 삭제
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const deletedNoteId = action.payload;

        state.notes = state.notes.filter((note) => note._id !== deletedNoteId);

        if (state.selectedNote?._id === deletedNoteId) {
          state.selectedNote = null;
        }

        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 캘린더 통계 조회
      .addCase(getStatics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.statics = action.payload;
      })
      .addCase(getStatics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedNote } = noteSlice.actions;

export default noteSlice.reducer;
