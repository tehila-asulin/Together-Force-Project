import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Volunteer } from "../../interface/Volunteer";
import { Organization } from "../../interface/Organization";
import { UserModes } from "../../interface/UserModes";

export const USER_MODES_OPTIONS: UserModes = {
  Volunteer: "Volunteer",
  Organization: "Organization",
  None: "None",
};

interface UserState {
  currentUser: Volunteer | Organization | null;
  userMode: keyof UserModes;
  token: string | null;
}

const initialState: UserState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  userMode: (localStorage.getItem("userMode") as keyof UserModes) || "None",
  token: localStorage.getItem("token") || null,
};

const togetherForceSlice = createSlice({
  name: "togetherForce",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Volunteer | Organization | null>) => {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setUserMode: (state, action: PayloadAction<keyof UserModes>) => {
      state.userMode = action.payload;
      localStorage.setItem("userMode", action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.userMode = "None";
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userMode");
      localStorage.removeItem("token");
    },
  },
});

export const {
  setCurrentUser,
  setUserMode,
  setToken,
  logout,
} = togetherForceSlice.actions;

export const selectUserMode = (state: { togetherForce: UserState }) => state.togetherForce.userMode;
export const selectCurrentUser = (state: { togetherForce: UserState }) => state.togetherForce.currentUser;
export const selectToken = (state: { togetherForce: UserState }) => state.togetherForce.token;

export default togetherForceSlice.reducer;
