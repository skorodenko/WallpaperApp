import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import layoutSlice from "./layoutSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    layout: layoutSlice,
    auth: authSlice,
  },
});
