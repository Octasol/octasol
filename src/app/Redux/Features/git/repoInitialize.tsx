"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const initialRepoState: Repository[] = [];

export const repoSlice = createSlice({
  name: "repo",
  initialState: initialRepoState,
  reducers: {
    setRepositories: (state, action: PayloadAction<Repository[]>) => {
      return action.payload;
    },
  },
});

export const { setRepositories } = repoSlice.actions;
export const repoReducer = repoSlice.reducer;
