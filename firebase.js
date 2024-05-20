// Import the functions you need from the SDKs you need
import { initializeApp, initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMymt5QNZjAltL2vk8nP0oIij3x-9EpG8",
  authDomain: "chancolors-64a2c.firebaseapp.com",
  projectId: "chancolors-64a2c",
  storageBucket: "chancolors-64a2c.appspot.com",
  messagingSenderId: "1094699409561",
  appId: "1:1094699409561:web:2d6c30209943bf3f365808",
  measurementId: "G-XQP4FFVR2Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = initializeServerApp(firebaseConfig); // Use initializeServerApp instead of initializeApp for SSR.

const auth = getAuth(app); // initialize auth
const db = getFirestore(app); // Initialize Cloud Firestore

export { auth, db };
