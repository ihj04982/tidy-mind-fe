import { configureStore } from '@reduxjs/toolkit';

import noteReducer from './note/noteSlice';
import toastReducer from './toast/toastSlice';

const store = configureStore({
  reducer: {
    note: noteReducer,
    toast: toastReducer,
  },
});

export default store;
