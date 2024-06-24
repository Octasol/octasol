"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  photo: string;
  githubId: string;
  // accessToken: string;
  // expires: Date;
};

const initialState: UserState = {
  name: "",
  email: "",
  photo: "",
  githubId: "",
  // accessToken: "",
  // expires: new Date(),
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
      // state.accessToken = action.payload.accessToken;
      // state.expires = action.payload.expires;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
