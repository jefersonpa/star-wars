import { createSlice } from '@reduxjs/toolkit';
export const searchByOptions = { people: 'people', movies: 'movies' };

const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState: {
    searchTerm: '',
    searchBy: searchByOptions.people,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
  },
});

const sharedReducer = sharedSlice.reducer;

export const { setSearchTerm, setSearchBy } = sharedSlice.actions;
export default sharedReducer;
