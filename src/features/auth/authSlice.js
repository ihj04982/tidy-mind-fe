import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { api, extractErrorMessage } from '../../utils/api';
import { showToast } from '../toast/toastSlice';

const initialState = {
  user: null,
  token: typeof window !== 'undefined' ? sessionStorage.getItem('token') : null,
  isLoading: false,
  error: null,
};

// 회원가입
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      dispatch(showToast({ message: data.message, severity: 'success' }));

      return data; // { message, user }
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

// 로그인
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(showToast({ message: data.message, severity: 'success' }));

      return data; // { message, token, user }
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

// 구글 로그인
export const googleLogin = createAsyncThunk(
  'auth/google',
  async ({ code }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/auth/google', { code });
      dispatch(showToast({ message: data.message, severity: 'success' }));

      return data; // { message, token, user }
    } catch (err) {
      return rejectWithValue(extractErrorMessage(err));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    // 새로고침 후 저장된 토큰으로 유저 복구
    hydrateFromStorage(state) {
      state.token = sessionStorage.getItem('token');
    },
    // 로그아웃
    logout(state) {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 로그인
      .addMatcher(isAnyOf(login.pending, googleLogin.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(login.fulfilled, googleLogin.fulfilled), (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        if (token) sessionStorage.setItem('token', token);
      })
      .addMatcher(isAnyOf(login.rejected, googleLogin.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, hydrateFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
