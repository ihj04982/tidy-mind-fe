import { configureStore } from '@reduxjs/toolkit';

import suggestReducer from '../features/suggest/suggestSlice';

const store = configureStore({
  reducer: {
    suggest: suggestReducer,
  },
});

export default store;
