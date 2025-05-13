import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.items.push(action.payload);
    },
    setLocations: (state, action) => {
      state.items = action.payload;
    },
    updateLocation: (state, action) => {
      const { id, ...changes } = action.payload;
      const locationIndex = state.items.findIndex(loc => loc.id === id);
      if (locationIndex !== -1) {
        state.items[locationIndex] = { ...state.items[locationIndex], ...changes };
      }
    },
    removeLocation: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(location => location.id !== id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addLocation, 
  setLocations, 
  updateLocation, 
  removeLocation,
  setLoading,
  setError 
} = locationsSlice.actions;

export default locationsSlice.reducer;
