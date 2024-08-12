import { createAsyncThunk } from "@reduxjs/toolkit";

// import { onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { auth } from "../../firebase";

interface UserData {
  name: string | null;
  email: string | null;
  photo: string | null;
  providerId: string | null;
  uid: string | null;
}

interface AuthState {
  loggedIn: boolean;
  user: UserData | null;
}

// Gets Google User Data
// [Still needs to retrieve the data from firestore lol]
export const getUserThunk = createAsyncThunk<AuthState>(
  "user/getUserThunk", // Action type
  async () => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      console.log("User Found");
      return {
        loggedIn: true,
        user: {
          name: user.displayName || "No Name",
          email: user.email || "No Email",
          photo: user.photoURL || "No Photo",
          providerId: user.providerId || "No Provider",
          uid: user.uid || "No UID",
        },
      };
    } else {
      console.log("User is Signed Out");
      return {
        loggedIn: false,
        user: null,
      };
    }
  }
);
