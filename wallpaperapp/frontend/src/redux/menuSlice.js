import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    open: false,
  },
  reducers: {
    toggle: (state) => {
        state.open = !state.open
    },
  },
});

export const { toggle } = menuSlice.actions;

export const selectOpen = (state) => state.menu.open;

export default menuSlice.reducer;
