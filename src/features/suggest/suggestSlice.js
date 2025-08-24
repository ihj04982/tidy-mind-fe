import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/api';

export const getSuggestions = createAsyncThunk(
  'suggest/getSuggestions',
  async ({ content, images = [] }, { rejectWithValue }) => {
    try {
      const response = await api.post('/suggest', { content, images });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get suggestions');
    }
  },
);

export const clearSuggestions = createAsyncThunk('suggest/clearSuggestions', async () => {
  return null;
});

const suggestSlice = createSlice({
  name: 'suggest',
  initialState: {
    suggestion: null,
    loading: false,
    error: null,
    lastRequestTime: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuggestion: (state) => {
      state.suggestion = null;
      state.error = null;
      state.loading = false;
    },
    updateSuggestionField: (state, action) => {
      if (state.suggestion) {
        const { field, value } = action.payload;
        if (field.includes('.')) {
          const fields = field.split('.');
          let current = state.suggestion;
          for (let i = 0; i < fields.length - 1; i++) {
            current = current[fields[i]];
          }
          current[fields[fields.length - 1]] = value;
        } else {
          state.suggestion[field] = value;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
        state.lastRequestTime = new Date().toISOString();
        state.error = null;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.suggestion = {
          _id: null,
          userId: null,
          title: 'Untitled',
          content: '',
          images: [],
          category: {
            name: 'Other',
            color: '#F5C3BD',
          },
          completion: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
      .addCase(clearSuggestions.fulfilled, (state) => {
        state.suggestion = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearError, resetSuggestion, updateSuggestionField } = suggestSlice.actions;
export default suggestSlice.reducer;
