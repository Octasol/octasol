import { configureStore } from "@reduxjs/toolkit";
import {
  gitReducer,
  installationIdReducer,
} from "./Features/git/githubInstallation";
import { repoReducer } from "./Features/git/repoInitialize";
import { errorReducer } from "./Features/error/error";
import { searchReducer } from "./Features/git/search";
import userReducer from "./Features/user/userSlice";
import counterReducer from "./Features/loader/loaderSlice";
import { profileReducer } from "./Features/profile/profileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  git: gitReducer,
  error: errorReducer,
  repo: repoReducer,
  installationId: installationIdReducer,
  search: searchReducer,
  repoData: repoReducer,
  counter: counterReducer,
  profile: profileReducer,
});

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     git: gitReducer,
//     error: errorReducer,
//     repo: repoReducer,
//     installationId: installationIdReducer,
//     search: searchReducer,
//     repoData: repoReducer,
//     counter: counterReducer,
//     profile: profileReducer,
//   },
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
