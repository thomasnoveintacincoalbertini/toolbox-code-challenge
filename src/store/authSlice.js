import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    type: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.type = action.payload.type;
    },
    clearAuth: (state) => {
      state.token = null;
      state.type = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
