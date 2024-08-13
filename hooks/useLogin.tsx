import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutOfFirebase,
} from "firebase/auth";
import { auth } from "../firebase";

// Hook that Authenticates Using Google with JavaScript
function useLogin() {
  const provider = new GoogleAuthProvider();

  // Async function Signs In + Sets User in Redux
  const signIn = async (): Promise<boolean> => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) throw new Error("Error with signInWithPopup");
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
