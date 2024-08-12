// Type: "tsrfce"
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";
import { setUser } from "../state/userSlice/user.slice";
import { selectUser } from "../state/userSlice/user.selectors";
import { useDispatch, useSelector } from "react-redux";

import { auth, db } from "../firebase";

type Props = {};

// This is a Top-Level Component!
function Page(prop: Props) {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  // Set User Data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || "No Name",
            email: user.email || "No Email",
            photo: user.photoURL || "No Photo",
            providerId: user.providerId || "No Provider",
            uid: user.uid || "No UID",
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
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
