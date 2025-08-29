import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api, extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

const initialState = {
  notes: [],
  status: { monthlyNotes: [], dailyCounts: [], total: 0 },
  selectedNote: null,
  error: null,
  loading: false,
};

const selectInitialSelectedNote = (notes) => {
  return notes[0] || null;
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

// AI suggestions과 함께 노트 생성
export const createNoteWithSuggestion = createAsyncThunk(
  'notes/createWithSuggestion',
  async ({ content, images = [] }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/notes/suggest', { content, images });

      dispatch(
        showToast({
          message: response.data.message,
          severity: 'success',
        }),
      );

      return response.data.note;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);

      // Show toast with appropriate message for 401
      if (error.response?.status === 401) {
        dispatch(
          showToast({
            message: '로그인이 필요합니다.',
            severity: 'error',
          }),
        );
        // Pass the full error object so component can check status
        return rejectWithValue({ message: errorMessage, status: 401, originalError: error });
      }

      dispatch(
        showToast({
          message: errorMessage,
          severity: 'error',
        }),
      );

      return rejectWithValue(errorMessage);
    }
  },
);

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

// Completed Task, Reminder
export const getStatus = createAsyncThunk('notes/getStatus', async (query, { dispatch }) => {
  try {
    const response = await api.get('/notes/status', { params: { ...query } });

    return response.data.data;
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
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.error = null;
        state.notes = action.payload;
        state.loading = false;
        state.selectedNote = selectInitialSelectedNote(state.notes);
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // 노트 상세 조회
      .addCase(getNote.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.error = null;
        state.selectedNote = action.payload;
        state.loading = false;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
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
          state.notes.unshift(action.payload); // 노트 목록 맨 앞에 추가
          state.selectedNote = action.payload; // 생성된 노트를 선택된 노트로 설정
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

        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note,
        );

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
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Completed Task, Reminder
      .addCase(getStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedNote, clearSelectedNote } = noteSlice.actions;

export default noteSlice.reducer;
