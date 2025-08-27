import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import noteReducer from './notes/noteSlice';
import toastReducer from './toast/toastSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    toast: toastReducer,
  },
});

export default store;
