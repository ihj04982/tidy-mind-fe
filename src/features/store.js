import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import notesReducer from './notes/noteSlice';
import toastReducer from './toast/toastSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    notes: notesReducer,
  },
});

export default store;
