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
// import { useAppSelector, useAppDispatch } from "../hooks/useType";
import useUserData from "../hooks/useUserData";

import { setUser, getUser } from "../state/userSlice/user.slice";
import useLogin from "../hooks/useLogin";

export default function Navbar() {
  const [userData] = useUserData();
  const [signIn, signOut] = useLogin();

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
              Object.keys(userData).length === 0
                ? signIntoApp()
                : signOutOfApp();
            }}
            color="inherit"
          >
            {Object.keys(userData).length === 0 ? "Sign In" : "Sign Out"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
