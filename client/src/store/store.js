import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./UserStatusSlice";
import keywordsSlice from "./UserDreamKeyWordSlice";
import userNameSlice from "./UserNameSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dreamKeyWords: keywordsSlice,
    userName: userNameSlice,
  },
})