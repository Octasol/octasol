"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  photo: string;
  githubId: string;
  image: string;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  company: string;
  blog: string;
  location: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  expires: string;
  accessToken: string;
};

const initialState: UserState = {
  name: "",
  email: "",
  photo: "",
  githubId: "",
  image: "",
  login: "",
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "User",
  site_admin: false,
  company: "",
  blog: "",
  location: "",
  hireable: true,
  bio: "",
  twitter_username: "",
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
  expires: "",
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
      state.image = action.payload.image;
      state.login = action.payload.login;
      state.node_id = action.payload.node_id;
      state.avatar_url = action.payload.avatar_url;
      state.gravatar_id = action.payload.gravatar_id;
      state.url = action.payload.url;
      state.html_url = action.payload.html_url;
      state.followers_url = action.payload.followers_url;
      state.following_url = action.payload.following_url;
      state.gists_url = action.payload.gists_url;
      state.starred_url = action.payload.starred_url;
      state.subscriptions_url = action.payload.subscriptions_url;
      state.organizations_url = action.payload.organizations_url;
      state.repos_url = action.payload.repos_url;
      state.events_url = action.payload.events_url;
      state.received_events_url = action.payload.received_events_url;
      state.type = action.payload.type;
      state.site_admin = action.payload.site_admin;
      state.company = action.payload.company;
      state.blog = action.payload.blog;
      state.location = action.payload.location;
      state.hireable = action.payload.hireable;
      state.bio = action.payload.bio;
      state.twitter_username = action.payload.twitter_username;
      state.public_repos = action.payload.public_repos;
      state.public_gists = action.payload.public_gists;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.expires = action.payload.expires;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
