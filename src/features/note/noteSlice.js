import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api, { extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

export const createNoteWithSuggestion = createAsyncThunk(
  'note/createWithSuggestion',
  async ({ content, images = [] }, { dispatch, rejectWithValue }) => {
    try {
      // 1. AI 제안 받기
      const suggestResponse = await api.post('/suggest', { content, images });
      const suggestion = suggestResponse.data;

      // 2. 제안된 데이터로 노트 데이터 구성
      const noteData = {
        title: suggestion.title,
        content: suggestion.content || content,
        images: suggestion.images || images,
        category: suggestion.category,
        completion: suggestion.completion,
      };

      // 3. 노트 저장 API 호출
      const noteResponse = await api.post('/notes', noteData);

      dispatch(
        showToast({
          message: '노트가 성공적으로 저장되었습니다!',
          status: 'success',
        }),
      );

      return noteResponse.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const authError = '로그인이 필요합니다. 5초 후 로그인 페이지로 이동합니다.';
        dispatch(
          showToast({
            message: authError,
            status: 'warning',
          }),
        );
        return rejectWithValue(authError);
      }
      const errorMessage = extractErrorMessage(error);
      dispatch(
        showToast({
          message: errorMessage,
          status: 'error',
        }),
      );

      return rejectWithValue(errorMessage);
    }
  },
);

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    currentNote: null,
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
    resetNoteState: (state) => {
      state.currentNote = null;
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
      });
  },
});

export const { clearError, clearSaveSuccess, resetNoteState } = noteSlice.actions;
export default noteSlice.reducer;
