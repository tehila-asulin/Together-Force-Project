import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/api/apiSlice"; // קובץ האם
import "./slices/api/volunteerApiSlice"; // רק לטעון את ה־endpoints
import "./slices/api/organizationApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

