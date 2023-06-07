import { createSlice } from "@reduxjs/toolkit";


export const userPageTabSlice = createSlice({
  name: "userPageTab",
  initialState: {
    tab: "uploaded",
  },
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload; 
    },
  },
});

export const { changeTab } = userPageTabSlice.actions;

export const selectTab = (state) => state.userPageTab.tab;

export default userPageTabSlice.reducer;
