"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Navbar() {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Auth Object Observer (event listener- needs to be manually removed)
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        // user object docs: https://firebase.google.com/docs/reference/js/auth.user
        console.log(currUser); // User is signed in
        console.log(currUser.uid);
        // const token = await user.getIdToken(); // identify the user to a Firebase service
        // console.log(token);
        setUser(currUser);
      } else {
        console.log("User Signed Out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Typography>ChanColors</Typography>
          </IconButton>

          <Button
            onClick={() => {
              user ? signOutOfApp() : signIn();
            }}
            color="inherit"
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
