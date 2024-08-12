import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutOfFirebase,
} from "firebase/auth";
import { useAppDispatch } from "./useType";
import { setUser } from "../state/userSlice/user.slice";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Hook that Authenticates Using Google with JavaScript
function useLogin() {
  const dispatch = useAppDispatch();
  const provider = new GoogleAuthProvider();

  // Async function Signs In + Sets User in Redux
  const signIn = async (): Promise<boolean> => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) throw new Error("Error with signInWithPopup");

      console.log(res.user);

      // Add User to Firestore if they don't exist
      const userDocRef = doc(db, "users", res.user.uid); // Create a document reference
      const userDocData = await getDoc(userDocRef); // Get the document snapshot

      if (!userDocData.exists()) {
        // setDoc() doesn't return anything on success
        await setDoc(userDocRef, {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
        });
        console.log("New User Created");
      } else {
        console.log("User Already Exists");
      }

      // dispatch(setUser(res.user)); // Save User to Redux
      console.log("Signed In"); // Sign-in successful.
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Async function signs out of Auth + Sets Redux User to Null
  const signOut = async (): Promise<boolean> => {
    try {
      await signOutOfFirebase(auth);
      // dispatch(setUser(null)); // Remove User From Redux
      console.log("Signed Out"); // Sign-out successful.
      return true;
    } catch (error) {
      console.log("Error Signing Out", error); // An error happened.
      return false;
    }
  };

  return [signIn, signOut];
}

export default useLogin;
