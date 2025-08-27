import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api, { extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

export const createNoteWithSuggestion = createAsyncThunk(
  'note/createWithSuggestion',
  async ({ content, images = [] }, { dispatch, rejectWithValue }) => {
    try {
      // AI suggestions과 함께 노트 생성
      const response = await api.post('/notes/suggest', { content, images });

      dispatch(
        showToast({
          message: '노트가 성공적으로 저장되었습니다!',
          severity: 'success',
        }),
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const authError = '로그인이 필요합니다. 5초 후 로그인 페이지로 이동합니다.';
        dispatch(
          showToast({
            message: authError,
            severity: 'warning',
          }),
        );
        return rejectWithValue(authError);
      }
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
  'note/previewSuggestion',
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

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    currentNote: null,
    previewNote: null, // preview용 (저장 전)
    loading: false,
    error: null,
    saveSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
    clearPreview: (state) => {
      state.previewNote = null;
    },
    resetNoteState: (state) => {
      state.currentNote = null;
      state.previewNote = null;
      state.error = null;
      state.loading = false;
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNoteWithSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(createNoteWithSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload.note; // 생성된 노트를 현재 노트로 설정
        state.notes.unshift(action.payload.note); // 노트 목록 맨 앞에 추가
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
      });
  },
});

export const { clearError, clearSaveSuccess, clearPreview, resetNoteState } = noteSlice.actions;
export default noteSlice.reducer;
