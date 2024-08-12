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

import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice/user.selectors";
import useLogin from "../hooks/useLogin";

export default function Navbar() {
  const [signIn, signOut] = useLogin();

  const userData = useSelector(selectUser);

  const signIntoApp = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
    }
  };

  const signOutOfApp = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
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
              userData?.name ? signOutOfApp() : signIntoApp();
            }}
            color="inherit"
          >
            {userData?.name ? "Sign Out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
