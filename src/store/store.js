import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '../features/common/uiSlice';
import noteReducer from '../features/note/noteSlice';

const store = configureStore({
  reducer: {
    note: noteReducer,
    ui: uiReducer,
  },
});

export default store;
