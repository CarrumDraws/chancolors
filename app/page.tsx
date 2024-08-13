// Type: "tsrfce"
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDoc, setDoc, doc, collection, addDoc } from "firebase/firestore";
import { selectUser } from "../state/userSlice/user.selectors";
import { useAppDispatch } from "../hooks/useType";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../state/userSlice/user.thunks";
import { RawUserData } from "./types/user";
import { auth, db } from "../firebase";

type Props = {};

// This is a Top-Level Component!
function Page(prop: Props) {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUser);

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

  async function addData() {
    // Add Data to firestore
    try {
      const newDoc = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      });
      console.log("Document written with ID: ", newDoc.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <Navbar />
      {userData?.name}
      {/* <button onClick={() => updateUser()}>Update User</button> */}
      {/* <button onClick={() => addData()}>Add Firestore Data</button> */}
    </div>
  );
}

export default Page;
