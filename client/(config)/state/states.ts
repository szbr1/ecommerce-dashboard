import { createSlice } from '@reduxjs/toolkit';

export const stateer = createSlice({
  name: 'newproject',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    setIsDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setIsDarkMode } = stateer.actions;
export const stateReducer = stateer.reducer;
