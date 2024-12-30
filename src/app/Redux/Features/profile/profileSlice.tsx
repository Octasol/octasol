"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Profilestate = {
  subHeading: string;
  image: string;
  name: string;
  link: string;
  description: string;
  twitter: string;
  telegram: string;
  discord: string;
  bountyname: string;
  price: number | undefined;
  skills: string[];
  time: string | undefined;
  contact: string;
  bountyDescription: string | undefined;
  sponsorid?: number;
  preDefined?: boolean;
};

const initialState: Profilestate = {
  subHeading: "",
  image: "",
  name: "",
  link: "",
  description: "",
  twitter: "",
  telegram: "",
  discord: "",
  bountyname: "",
  price: undefined,
  skills: [],
  time: new Date().toISOString(),
  contact: "",
  bountyDescription: "",
  sponsorid: undefined,
  preDefined: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Profilestate>) => {
      return { ...state, ...action.payload };
    },
    setSubHeading: (state, action: PayloadAction<string>) => {
      state.subHeading = action.payload;
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
    setTwitter: (state, action: PayloadAction<string>) => {
      state.twitter = action.payload;
    },
    setTelegram: (state, action: PayloadAction<string>) => {
      state.telegram = action.payload;
    },
    setDiscord: (state, action: PayloadAction<string>) => {
      state.discord = action.payload;
    },
    setSponsorId: (state, action: PayloadAction<number>) => {
      state.sponsorid = action.payload;
    },
    setBountyName: (state, action: PayloadAction<string>) => {
      state.bountyname = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    setTime: (state, action: PayloadAction<string | undefined>) => {
      state.time = action.payload;
    },
    setContact: (state, action: PayloadAction<string>) => {
      state.contact = action.payload;
    },
    setBountyDescription: (state, action: PayloadAction<string>) => {
      state.bountyDescription = action.payload;
    },
    setPredefined: (state, action: PayloadAction<boolean>) => {
      state.preDefined = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  setUser,
  setImage,
  setSubHeading,
  setName,
  setLink,
  setDescription,
  setTwitter,
  setTelegram,
  setDiscord,
  resetProfile,
  setSponsorId,
  setBountyName,
  setPrice,
  setSkills,
  setTime,
  setContact,
  setBountyDescription,
  setPredefined,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
