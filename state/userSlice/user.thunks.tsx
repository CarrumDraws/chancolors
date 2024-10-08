import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { UserData, AuthState, RawUserData } from "../../types/user";
import { db } from "../../firebase";

// Gets/Sets Google User Data Given Raw FireAuth User
// [Retrieves data from Firebase / Sets New User]
// <ReturnType, InputType>
export const getUserThunk = createAsyncThunk<AuthState, RawUserData>(
  "user/getUserThunk", // Action Type Prefix
  async ({ user }: RawUserData) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid); // Create a document reference
      const userDocData = await getDoc(userDocRef); // Get the document snapshot

      // Create New User
      if (!userDocData.exists()) {
        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        } as UserData;
        await setDoc(userDocRef, newUser);
        console.log("New User Created");
        return { user: newUser };
      }
      const userData = userDocData.data() as UserData; // Typecast as UserData
      return {
        user: userData,
      };
    } else {
      return {
        user: null,
      };
    }
  }
);
