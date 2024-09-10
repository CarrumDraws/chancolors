// Type: "tsrfce"
"use client";

import React from "react";
import { updateDoc, doc } from "firebase/firestore";
import { selectUser } from "../state/userSlice/user.selectors";
import { useAppDispatch, useAppSelector } from "../hooks/useType";
import { db } from "../firebase";
import { updateUser } from "../state/userSlice/user.slice";

type Props = {};

// This is a Top-Level Component!
function Page(prop: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);

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
      {userData?.name}
      {userData?.name && <button onClick={() => editUser()}>Edit User</button>}
    </div>
  );
}

export default Page;
