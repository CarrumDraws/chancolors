"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useType";
import { selectUser } from "../state/userSlice/user.selectors";
import { getUserThunk } from "../state/userSlice/user.thunks";
import { RawUserData } from "../types/user";
import { auth, db } from "../firebase";

// Global useEffect triggered here
export default function ThunkDispatch() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);

  // Set User Data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user: RawUserData["user"]) => {
        // If user is already in redux, no need for this!
        console.log("AuthStateChanged Detected");
        console.log(user);
        if (!user || !userData || !userData.name) {
          dispatch(getUserThunk({ user })); // Trigger Sign In Thunk
        } else {
          console.log("User Data Already in Redux");
        }
      }
    );
    return () => unsubscribe();
  }, [dispatch, userData]);

  return null;
}
