import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  projects: [],
  error: null,
  loading: false,
};
export const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
    storeProjects: (state, action) => {
      state.projects = action.payload.projects;
      state.loading = false;
      state.error = '';
    },
    storeLoading: state => {
      state.loading = true;
      state.projects = [];
      state.error = '';
    },
    storeError: (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.payload.error;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeProjects, storeLoading, storeError } =
  projectsSlice.actions;
export const getProjects = state => state.projectsSlice.projects;
export const getLoading = state => state.projectsSlice.loading;
export const getError = state => state.projectsSlice.error;

export default projectsSlice.reducer;
