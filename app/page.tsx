// Type: "tsrfce"
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDoc, setDoc, doc, collection, addDoc } from "firebase/firestore";
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // [TRIGGER SIGN-IN THUNK IMMEDIATELY HERE]
      // Also- sign out thunk, getSessionData thunk
      // (Sign-in and Sign-out thunks can still be manually triggered in navbar)
      // thunk handles entire sign-in + dispatch() process. Only the thunk can  dispatch() user data
      // Also create a signOut() thunk
      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Create a document reference
        const userDocData = await getDoc(userDocRef); // Get the document snapshot
        if (userDocData.exists()) {
          let userData = userDocData.data();
          dispatch(
            setUser({
              name: userData.displayName,
              email: userData.email,
              photo: userData.photoURL,
              providerId: userData.providerId,
              uid: userData.uid,
            })
          );
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {}, []);

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
