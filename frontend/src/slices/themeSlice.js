import { createSlice } from "@reduxjs/toolkit";

const savedMode = localStorage.getItem("mode");
const prefresDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: savedMode ? savedMode : prefresDark ? "dark" : "light",
  },
  reducers: {
    toggle: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
  },
});

export const { toggle } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;

export default themeSlice.reducer;
