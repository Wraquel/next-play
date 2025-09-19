import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/usersSlice"
import user from "./slices/userSlice"
import toasts from "./slices/toastSlice"

const slices = {
  users,
  user,
  toasts
};

export const store = configureStore({
  reducer:slices
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
