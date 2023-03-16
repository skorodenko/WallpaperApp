import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import layoutSlice from "./layoutSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    layout: layoutSlice,
  },
});
