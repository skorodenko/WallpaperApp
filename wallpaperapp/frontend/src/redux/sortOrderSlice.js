import { createSlice } from "@reduxjs/toolkit";


export const sortOrderSlice = createSlice({
  name: "sortOrder",
  initialState: {
    sort: "new",
    delta: "day",
  },
  reducers: {
    changeSortOrder: (state, action) => {
      state.sort = action.payload; 
    },
    changeSortDelta: (state, action) => {
      state.delta = action.payload; 
    },
  },
});

export const { changeSortOrder, changeSortDelta } = sortOrderSlice.actions;

export const selectSortOrder = (state) => state.sortOrder;

export default sortOrderSlice.reducer;
