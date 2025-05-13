// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Volunteer } from "../../interface/Volunteer";
// import { Organization } from "../../interface/Organization";
// import { UserModes } from "../../interface/UserModes";

// interface UserState {
//   currentUser: Volunteer | Organization | null;
//   userMode: UserModes;
//   token: string | null;
// }

// const initialState: UserState = {
//   currentUser: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : null,
//   userMode: (localStorage.getItem("userMode") as UserModes) || UserModes.None,
//   token: localStorage.getItem("token") || null,
// };

// const togetherForceSlice = createSlice({
//   name: "togetherForce",
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action: PayloadAction<Volunteer | Organization | null>) => {
//       state.currentUser = action.payload;
//       if (action.payload) {
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       } else {
//         localStorage.removeItem("user");
//       }
//     },
//     setUserMode: (state, action: PayloadAction<UserModes>) => {
//       state.userMode = action.payload;
//       localStorage.setItem("userMode", action.payload);
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       localStorage.setItem("token", action.payload);
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.userMode = UserModes.None;
//       state.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("userMode");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const {
//   setCurrentUser,
//   setUserMode,
//   setToken,
//   logout,
// } = togetherForceSlice.actions;

// export const selectUserMode = (state: { togetherForce: UserState }) => state.togetherForce.userMode;
// export const selectCurrentUser = (state: { togetherForce: UserState }) => state.togetherForce.currentUser;
// export const selectToken = (state: { togetherForce: UserState }) => state.togetherForce.token;

// export default togetherForceSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// interface TogetherForceState {
//   currentUser: any | null;
//   token: string | null;
//   userMode: string | null;
// }

// const initialState: UserState = {
//     currentUser: localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user")!)
//       : null,
//     userMode: (localStorage.getItem("userMode") as UserModes) || UserModes.None,
//     token: localStorage.getItem("token") || null,
//   };

// export const togetherForceSlice = createSlice({
//   name: "togetherForce",
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     setUserMode: (state, action) => {
//       state.userMode = action.payload;
//     },
//   },
// });

// export const { setCurrentUser, setToken, setUserMode } = togetherForceSlice.actions;

// export const selectCurrentUser = (state: { togetherForce: TogetherForceState }) => state.togetherForce.currentUser;
// export const selectToken = (state: { togetherForce: TogetherForceState }) => state.togetherForce.token;
// export const selectUserMode = (state: { togetherForce: TogetherForceState }) => state.togetherForce.userMode;

// export default togetherForceSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { Volunteer } from "../../interface/Volunteer";
import { Organization } from "../../interface/Organization";
import { UserModes } from "../../interface/UserModes";
import {Volunteering} from "../../interface/Volunteering"


interface TogetherForceState {
  currentUser: Volunteer | Organization | null;
  token: string | null;
  userMode: UserModes;
  volunteerings: Volunteering[];
}


const initialState: TogetherForceState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  userMode: (localStorage.getItem("userMode") as UserModes) || UserModes.None,
  token: localStorage.getItem("token") || null,
  volunteerings: [], 
};


export const togetherForceSlice = createSlice({
  name: "togetherForce",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMode: (state, action) => {
      state.userMode = action.payload;
    },
    setVolunteerings: (state, action) => {
      state.volunteerings = action.payload;
    },
    addVolunteering: (state, action) => {
      state.volunteerings.push(action.payload);
    },
  },
});


export const {
  setCurrentUser,
  setToken,
  setUserMode,
  setVolunteerings,
  addVolunteering,
} = togetherForceSlice.actions;


export const selectCurrentUser = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.currentUser;
export const selectToken = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.token;
export const selectUserMode = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.userMode;
export const selectVolunteerings = (state: { togetherForce: TogetherForceState }) =>
  state.togetherForce.volunteerings;

export default togetherForceSlice.reducer;
