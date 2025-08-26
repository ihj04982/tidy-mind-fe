import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import noteReducer from './note/noteSlice';
import toastReducer from './toast/toastSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    toast: toastReducer,
  },
});

export default store;
