"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Profilestate = {
  who: string;
  image: string;
  name: string;
  link: string;
  description: string;
  github: string;
  twitter: string;
  telegram: string;
  discord: string;
};

const initialState: Profilestate = {
  who: "",
  image: "",
  name: "",
  link: "",
  description: "",
  github: "",
  twitter: "",
  telegram: "",
  discord: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Profilestate>) => {
      return { ...state, ...action.payload };
    },
    setWho: (state, action: PayloadAction<string>) => {
      state.who = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setGithub: (state, action: PayloadAction<string>) => {
      state.github = action.payload;
    },
    setTwitter: (state, action: PayloadAction<string>) => {
      state.twitter = action.payload;
    },
    setTelegram: (state, action: PayloadAction<string>) => {
      state.telegram = action.payload;
    },
    setDiscord: (state, action: PayloadAction<string>) => {
      state.discord = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  setUser,
  setImage,
  setWho,
  setName,
  setLink,
  setDescription,
  setGithub,
  setTwitter,
  setTelegram,
  setDiscord,
  resetProfile,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
