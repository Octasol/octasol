"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Installation {
  id: number;
  account: {
    login: string;
  };
}
type InstallationId = string | null;

const initialInstallationsState: Installation[] = [];
const InstallationId: InstallationId = "";


export const gitSlice = createSlice({
  name: "git",
  initialState: initialInstallationsState,
  reducers: {
    setInstallations: (state, action: PayloadAction<Installation[]>) => {
      return action.payload;
    },
  },
});


export const installationIdSlice = createSlice({
  name: "installationId",
  initialState: InstallationId,
  reducers: {
    setInstallationId: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setInstallations } = gitSlice.actions;
export const { setInstallationId } = installationIdSlice.actions;

export const gitReducer = gitSlice.reducer;
export const installationIdReducer = installationIdSlice.reducer;
