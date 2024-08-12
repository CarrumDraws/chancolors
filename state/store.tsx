import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true, // devTools toggle!
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Export `RootState` and `AppDispatch` types
// They are inferred from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
