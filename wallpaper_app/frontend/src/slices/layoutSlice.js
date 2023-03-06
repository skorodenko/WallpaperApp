import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    columns: 1,
  },
  reducers: {
    set: (state, action) => {
      state.columns = action.payload; 
      localStorage.setItem("columns", state.columns);
    },
  },
});

export const { set } = layoutSlice.actions;

export const selectLayout = (state) => state.layout.columns;

export default layoutSlice.reducer;
