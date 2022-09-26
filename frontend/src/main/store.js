import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import layoutSlice from "../slices/layoutSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    layout: layoutSlice,
  },
});
