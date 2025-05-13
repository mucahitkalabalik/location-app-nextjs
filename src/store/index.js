import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
