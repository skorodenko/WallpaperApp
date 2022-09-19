import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../header/themeSlice";
import layoutSlice from "../album/layoutSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    layout: layoutSlice,
  },
});
