"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  photo: string;
  githubId: string;
  login: string;
  accessToken: string;
};

const initialState: UserState = {
  name: "",
  email: "",
  photo: "",
  githubId: "",
  login: "",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.githubId = action.payload.githubId;
      state.login = action.payload.login;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
