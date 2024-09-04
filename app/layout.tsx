"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../state/store";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
