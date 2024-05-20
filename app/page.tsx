// Type: "tsrfce"
"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

type Props = {};
const provider = new GoogleAuthProvider();

function Page(prop: Props) {
  const [thisUser, setUser] = useState<any>(null);

  const signIn = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result !== null) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          console.log(token);
          console.log(result.user);

          // Save result.user.uid to redux persist
          try {
            await setDoc(doc(db, "users", result.user.uid), {
              name: result.user.displayName,
              email: result.user.email,
              image: result.user.photoURL,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutOfApp = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error Signing Out");
      });
  };

  useEffect(() => {
    // Auth Object Observer (event listener- needs to be manually removed)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // user object docs: https://firebase.google.com/docs/reference/js/auth.user
        console.log(user); // User is signed in
        console.log(user.uid);
        // const token = await user.getIdToken(); // identify the user to a Firebase service
        // console.log(token);
        setUser(user);
      } else {
        console.log("User Signed Out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function updateUser() {
    // Updates user session object
    updateProfile(thisUser, {
      displayName: "Calum",
    })
      .then(() => {
        console.log("Updated"); // Profile updated!
      })
      .catch((error) => {
        console.log(error); // An error occurred
      });
  }

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
      Hello, Next.js!<button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => updateUser()}>Update User</button>
      <button onClick={() => addData()}>Add Firestore Data</button>
      <button onClick={() => signOutOfApp()}>Sign Out</button>
    </div>
  );
}

export default Page;
