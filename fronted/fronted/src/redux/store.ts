import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../redux/slices/api/apiSlice';
import togetherForceReducer from './slices/togetherForceSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    togetherForce: togetherForceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
