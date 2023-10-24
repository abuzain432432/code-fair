import { configureStore } from '@reduxjs/toolkit';
import { api } from '../rtq-apis/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import projectSliceReducer from './projectsSlice.js';
import userAuthSliceReducer from './userAuthSlice.js';
import projectDetailsSliceReducer from './projectDetailsSlice.js';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    projectsSlice: projectSliceReducer,
    projectDetailsSlice: projectDetailsSliceReducer,
    userAuthSlice: userAuthSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;
setupListeners(store.dispatch);
