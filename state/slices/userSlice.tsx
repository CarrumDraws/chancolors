import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface CounterState {
  user: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  user: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.user += 1;
    },
    decrement: (state) => {
      state.user -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.user += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.user;

export default userSlice.reducer;
