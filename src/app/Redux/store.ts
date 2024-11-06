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

export const store = configureStore({
  reducer: {
    user: userReducer,
    git: gitReducer,
    error: errorReducer,
    repo: repoReducer,
    installationId: installationIdReducer,
    search: searchReducer,
    repoData: repoReducer,
    counter: counterReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
