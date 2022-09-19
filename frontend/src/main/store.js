import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../header/themeSlice"
export default configureStore({
  reducer: {
    theme: themeReducer,
  },
});
