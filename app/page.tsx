// Type: "tsrfce"
"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { updateDoc, doc } from "firebase/firestore";
import { selectUser } from "../state/userSlice/user.selectors";
import { useAppDispatch, useAppSelector } from "../hooks/useType";
import { getUserThunk } from "../state/userSlice/user.thunks";
import { RawUserData } from "./types/user";
import { auth, db } from "../firebase";
import { updateUser } from "../state/userSlice/user.slice";

type Props = {};

// This is a Top-Level Component!
function Page(prop: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);

  // Set User Data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user: RawUserData["user"]) => {
        // Trigger Sign In Thunk
        dispatch(getUserThunk({ user }));
      }
    );
    return () => unsubscribe();
  }, [dispatch]);

  async function editUser() {
    // Update User's firestore Data
    try {
      if (!userData) throw new Error("userData is null");
      await updateDoc(doc(db, "users", userData.uid), {
        name: "Carrum",
      });
      // Update in Redux Too!
      dispatch(updateUser({ name: "Carrum" }));
      console.log("Updated Data");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <Navbar />
      {userData?.name}
      {userData?.name && <button onClick={() => editUser()}>Edit User</button>}
    </div>
  );
}

export default Page;
