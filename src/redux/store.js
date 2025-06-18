import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import jobSlice from "./JobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  job: jobSlice,
  application: applicationSlice,
  company: companySlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
