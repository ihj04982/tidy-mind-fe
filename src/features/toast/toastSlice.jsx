import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { items: [] };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    add(state, action) {
      const { id, message, severity = 'info', duration = 3000 } = action.payload;
      state.items.push({ id, message, severity, duration });
      if (state.items.length > 4) state.items.shift();
    },
    remove(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { add: toastAdded, remove: toastRemoved, clear: toastCleared } = toastSlice.actions;
export default toastSlice.reducer;

// 공통 Toast
export const showToast =
  ({ message, severity = 'info', duration = 3000 }) =>
  (dispatch) => {
    const id = nanoid();
    dispatch(toastAdded({ id, message: String(message), severity, duration }));
    setTimeout(() => dispatch(toastRemoved(id)), duration);
    return id;
  };
