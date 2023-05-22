import { createSlice } from "@reduxjs/toolkit";

const prefresDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: prefresDark ? "dark" : "light",
  },
  reducers: {
    toggle: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggle } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;

export default themeSlice.reducer;
