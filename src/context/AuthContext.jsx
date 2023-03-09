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
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function handleGoogleLogin() {
    const { auth } = getFirebase();
    signInWithPopup(auth, providers)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setLoginLoading(true);
        setUser(user);
      })
      .then(() => {
        auth.currentUser.getIdTokenResult().then((id_result) => {
          if (id_result?.claims?.phoneNumber === undefined) {
            navigate("/login/number");
          }
        });
        navigate("/");
        setLoginLoading(false);
      })
      ?.catch((error) => {
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
        localStorage.removeItem("cartData");
        console.log("You have successful sign out!!");
        window.location.reload();
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

      if (user) {
        auth.currentUser.getIdTokenResult().then((id_result) => {
          if (id_result?.claims?.phoneNumber === undefined) {
            navigate("/login/number");
          }
        });
      }

      // if (location.pathname.toLowerCase() === "/login") {
      //   navigate("/");
      // }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleGoogleLogin,
        handleSignOut,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
