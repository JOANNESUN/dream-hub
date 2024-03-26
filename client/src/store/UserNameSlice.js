import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getUserName: '',
};

const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.getUserName = action.payload;
    },
  },
});

export const { setUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
