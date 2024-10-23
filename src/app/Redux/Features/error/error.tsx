"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorState = string;

const initialErrorState: ErrorState = "";


export const errorSlice = createSlice({
  name: "error",
  initialState: initialErrorState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    clearError: () => {
      return "";
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
