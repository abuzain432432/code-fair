import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  project: null,
  error: null,
  loading: false,
  selectedProjectId: null,
};
export const projectDetailsSlice = createSlice({
  name: 'projectDetailsSlice',
  initialState,
  reducers: {
    storeProject: (state, action) => {
      state.project = action.payload.project;
      state.loading = false;
      state.error = '';
    },
    storeSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload.id;
    },
    storeLoading: state => {
      state.loading = true;
      state.project = null;
      state.error = '';
    },
    storeError: (state, action) => {
      state.loading = false;
      state.project = null;
      state.error = action.payload.error;
      state.selectedProjectId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeProject,
  storeLoading,
  storeError,
  storeSelectedProjectId,
} = projectDetailsSlice.actions;
export const getProject = state => state.projectDetailsSlice.project;
export const getLoading = state => state.projectDetailsSlice.loading;
export const getError = state => state.projectDetailsSlice.error;
export const getSelectedProjectId = state =>
  state.projectDetailsSlice.selectedProjectId;

export default projectDetailsSlice.reducer;
