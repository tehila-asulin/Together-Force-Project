import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/api/apiSlice"; 
import togetherForceSlice from "./slices/togetherForceSlice"; 
import "./slices/api/volunteerApiSlice"; 
import "./slices/api/organizationApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    togetherForce: togetherForceSlice, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;