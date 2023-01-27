import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { getFirebase } from "../utils/firebaseConfig";

const providers = new GoogleAuthProvider();

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  function handleGoogleLogin() {
    const { auth } = getFirebase();
    signInWithPopup(auth, providers)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        setUser(user);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function handleSignOut() {
    const { auth } = getFirebase();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("You have successful sign out!!");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  useEffect(() => {
    const { auth } = getFirebase();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("Please Sign In again!!");
        navigate("/login");
      }

      if (location.pathname.toLowerCase() === "/login") {
        navigate("/");
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleGoogleLogin, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
