import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
}

export const loginSlice = createSlice({
  // name of the slice
  name: 'loginStatus',
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.userLoginStatus = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStatus } = loginSlice.actions

export default loginSlice.reducer