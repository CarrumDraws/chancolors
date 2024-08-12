import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutOfFirebase,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Hook that Authenticates Using Google with JavaScript
function useLogin() {
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
          photo: res.user.photoURL,
          providerId: res.user.providerId,
          uid: res.user.uid,
        });
        console.log("New User Created");
      } else {
        console.log("User Already Exists");
      }

      console.log("Signed In"); // Sign-in successful.
      return true;
    } catch (error) {
      console.log("Error Signing In: ", error);
      return false;
    }
  };

  // Async function signs out of Auth + Sets Redux User to Null
  const signOut = async (): Promise<boolean> => {
    try {
      await signOutOfFirebase(auth);
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
