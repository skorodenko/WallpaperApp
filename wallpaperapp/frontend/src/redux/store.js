import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import themeReducer from "./themeSlice";
import sortOrderReducer from "./sortOrderSlice";
import userPageTab from "./userPageTab";
import authReducer from "./authSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "userPageTab"],
}

const rootReducer = combineReducers({
    theme: themeReducer,
    sortOrder: sortOrderReducer,
    auth: authReducer,
    userPageTab: userPageTab,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)
