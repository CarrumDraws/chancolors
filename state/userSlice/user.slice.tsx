import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserThunk } from "./user.thunks";
import { UserData, AuthState } from "../../app/types/user";
import type { RootState } from "../store";
// Define a type for the slice state

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    // Partial?
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserThunk.fulfilled,
      // PayloadAction = Return Type of Thunk
      (state, action: PayloadAction<AuthState>) => {
        state.user = action.payload.user; // Updates the "user" state property with payload data
      }
    );
  },
});

export const { setUser, updateUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user; // Export Selector
export default userSlice.reducer;
