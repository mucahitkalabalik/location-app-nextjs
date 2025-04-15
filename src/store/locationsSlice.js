import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
  name: 'locations',
  initialState: [],
  reducers: {
    addLocation: (state, action) => {
      state.push(action.payload);
    },
    setLocations: (state, action) => {
      return action.payload;
    },
  },
});

export const { addLocation, setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
