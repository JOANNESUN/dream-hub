import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./UserStatusSlice";
import keywordsSlice from "./UserDreamKeyWordSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dreamKeyWords: keywordsSlice,
  },
})