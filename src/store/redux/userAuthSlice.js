import { createSlice } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});
export const { setUser, clearUser } = userAuthSlice.actions;
export const getUser = state => state?.userAuthSlice;
export default userAuthSlice.reducer;
