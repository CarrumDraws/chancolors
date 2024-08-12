import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
// import { getUserThunk } from "./user.thunks";

// Define a type for the slice state
export interface UserState {
  loggedIn: boolean;
  user: Record<string, any> | null;
}

const initialState: UserState = {
  loggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<object | null>) => {
      state.user = action.payload;
    },
    setLoggedIn: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     getUserThunk.fulfilled, // (Just handles the "fufilled" state)
  //     // This returned state replaces the old state
  //     (_state, action) => {
  //       // action.payload = data returned by thunk
  //       // .reduce turns array into object of id: data pairs
  //       console.log(action.payload);
  //       return action.payload;
  //     }
  //   );
  // },
});

export const { setUser, setLoggedIn } = userSlice.actions;
export const getUser = (state: RootState) => state.user; // Export Selector
export default userSlice.reducer;
