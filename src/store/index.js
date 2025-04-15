import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './locationsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});
