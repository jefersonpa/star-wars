import { createSlice } from '@reduxjs/toolkit';
export const searchByOptions = { people: 'people', movies: 'movies' };

const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState: {
    searchTerm: '',
    searchBy: searchByOptions.people,
    detailsBy: searchByOptions.people,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setDetailsBy: (state, action) => {
      state.detailsBy = action.payload;
    },
  },
});

const sharedReducer = sharedSlice.reducer;

export const { setSearchTerm, setSearchBy, setDetailsBy } = sharedSlice.actions;
export default sharedReducer;
