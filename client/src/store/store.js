import { configureStore } from '@reduxjs/toolkit';
import loginSlice from "./UserStatusSlice";
import keywordsSlice from "./UserDreamKeyWordSlice";

export const store = configureStore({
  reducer: {
    loginStatus: loginSlice,
    dreamKeyWords: keywordsSlice,
  },
})