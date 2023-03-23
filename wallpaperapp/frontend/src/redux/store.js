import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import layoutSlice from "./layoutSlice";
import menuSlice from "./menuSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    layout: layoutSlice,
    menu: menuSlice,
  },
});
