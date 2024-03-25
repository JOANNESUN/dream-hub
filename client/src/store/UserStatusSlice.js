import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
  userSignupStatus: false,
}

export const authSlice = createSlice({
  // name of the slice
  name: 'authStatus',
  initialState,
  reducers: {
    updateLoginStatus: (state, action) => {
      state.userLoginStatus = action.payload;
    },
    updateSignupStatus: (state, action) => {
      state.userSignupStatus = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateLoginStatus, updateSignupStatus } = authSlice.actions

export default authSlice.reducer