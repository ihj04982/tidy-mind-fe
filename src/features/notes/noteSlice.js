import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api, extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

const initialState = {
  notes: [],
  selectedNote: null,
  currentNote: null,
  previewNote: null, // preview용 (저장 전)
  loading: false,
  error: null,
  saveSuccess: false,
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

// 유저가 note를 수정 후, 저장 전 새로운 suggestion을 preview 할 수 있는 기능 구현 시 사용 (바로 저장 x)
export const previewSuggestion = createAsyncThunk(
  'notes/previewSuggestion',
  async ({ content, images = [] }, { rejectWithValue }) => {
    try {
      const response = await api.post('/suggest', { content, images });
      return response.data;
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
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

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSaveSuccess(state) {
      state.saveSuccess = false;
    },
    clearPreview(state) {
      state.previewNote = null;
    },
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },
    clearSelectedNote(state) {
      state.selectedNote = null;
    },
    resetNoteState(state) {
      state.currentNote = null;
      state.previewNote = null;
      state.error = null;
      state.loading = false;
      state.saveSuccess = false;
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

      // AI suggestions과 함께 노트 생성
      .addCase(createNoteWithSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(createNoteWithSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload; // 생성된 노트를 현재 노트로 설정
        if (action.payload) {
          state.notes.unshift(action.payload); // 노트 목록 맨 앞에 추가
        }
        state.saveSuccess = true;
        state.error = null;
      })
      .addCase(createNoteWithSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.saveSuccess = false;
      })

      // suggestion 저장 전 미리보기 기능 구현 시 사용
      .addCase(previewSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.previewNote = null;
      })
      .addCase(previewSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.previewNote = action.payload;
        state.error = null;
      })
      .addCase(previewSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.previewNote = null;
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

export const {
  clearError,
  clearSaveSuccess,
  clearPreview,
  setSelectedNote,
  clearSelectedNote,
  resetNoteState,
} = noteSlice.actions;

export default noteSlice.reducer;
