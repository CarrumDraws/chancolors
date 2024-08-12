// Type: "tsrfce"
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";
import useLogin from "../hooks/useLogin";
import { setUser, setLoggedIn } from "../state/userSlice/user.slice";
import { selectUser } from "../state/userSlice/user.selectors";
import { useDispatch, useSelector } from "react-redux";

import { auth, db } from "../firebase";

type Props = {};

// This is a Top-Level Component!
function Page(prop: Props) {
  const [signIn, signOut] = useLogin();

  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  // Set User Data
  // How to use Redux devtools?
  // (Can I use redux-persist to maintain data?)
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

  const signIntoApp = async () => {
    try {
      await signIn();
      console.log("Signed In");
    } catch (error) {
      console.log("Error Signing In: ", error);
    }
  };

  const signOutOfApp = async () => {
    try {
      await signOut();
      console.log("Signed Out");
    } catch (error) {
      console.log("Error Signing Out: ", error);
    }
  };

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
      <button onClick={() => signIntoApp()}>Sign In</button>
      {userData?.name}
      {/* <button onClick={() => updateUser()}>Update User</button> */}
      {/* <button onClick={() => addData()}>Add Firestore Data</button> */}
      <button onClick={() => signOutOfApp()}>Sign Out</button>
    </div>
  );
}

export default Page;
