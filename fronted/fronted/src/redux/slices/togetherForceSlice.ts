import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Volunteer } from "../../interface/Volunteer";
import {UserModes} from "../../interface/UserModes"
import { Organization } from "../../interface/Organization";
export const USER_MODES_OPTIONS: UserModes = {
    Volunteer: "Volunteer",
    Organization: "Organization",
    None: "None",
};

interface UserState {
    currentUser: Volunteer | null| Organization;
    userMode: keyof UserModes;  
}
const initialState: UserState = {
    currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  userMode: (localStorage.getItem("userMode") as keyof UserModes) || "None",
  };
  


const togetherForceSlice = createSlice({
    name: "togetherForce",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<Volunteer | Organization|null>) => {
            state.currentUser = action.payload;
        },
        setUserMode: (state, action: PayloadAction<keyof UserModes>) => {
            state.userMode = action.payload;
        },
    },
});

export default togetherForceSlice.reducer;

export const selectUserMode = (state: { togetherForce: UserState }) => state.togetherForce.userMode;
export const selectCurrentUser = (state: { togetherForce: UserState }) => state.togetherForce.currentUser;

export const { 
    setCurrentUser,
    setUserMode,
} = togetherForceSlice.actions;