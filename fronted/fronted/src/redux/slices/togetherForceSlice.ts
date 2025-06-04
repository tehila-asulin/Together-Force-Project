import { createSlice } from "@reduxjs/toolkit";
import { Volunteer } from "../../interface/Volunteer";
import { Organization } from "../../interface/Organization";
import { UserModes } from "../../interface/UserModes";

interface TogetherForceState {
  currentUser: Volunteer | Organization | null;
  userMode: UserModes;
}


const initialState: TogetherForceState = {
  currentUser: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")!): null,
  userMode: (localStorage.getItem("userMode") as UserModes) || UserModes.None,
};


export const togetherForceSlice = createSlice({
  name: "togetherForce",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserMode: (state, action) => {
      state.userMode = action.payload;
    }
  },
});


export const {
  setCurrentUser,
  setUserMode,
} = togetherForceSlice.actions;


export const selectCurrentUser = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.currentUser;
export const selectUserMode = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.userMode;

export default togetherForceSlice.reducer;
