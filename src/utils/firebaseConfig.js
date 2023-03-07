

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator
} from "firebase/firestore";

import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable
} from "firebase/functions";

import {
  getAuth,
  connectAuthEmulator
} from "firebase/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APPID,

  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  if (location.hostname !== "localhost") {
    const appCheck = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider('6Le65I0kAAAAANibM2WZrCQdBJWIVzn7AKz_H6j4'),
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    })
  }
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const functions = getFunctions(firebaseApp)
  return { firebaseApp, firestore, auth, isConfigured, functions };
}

function connectToEmulators({ auth, firestore, functions }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFunctionsEmulator(functions, "localhost", 5001);
    // console.log("auth emulators");
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);
    // console.log("connected to emulators");
  }
  return services;
}

export function newOrder(data) {
  const { functions } = getFirebase();
  const newOrder = httpsCallable(functions, 'newOrder');
  return newOrder(data)
}

