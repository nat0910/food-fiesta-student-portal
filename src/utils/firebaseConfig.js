

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable
} from "firebase/functions";

import {
  getAuth,
  updateProfile,
  connectAuthEmulator,
  signInWithPhoneNumber,
  onAuthStateChanged,
  reauthenticateWithRedirect,
  RecaptchaVerifier
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

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
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
    console.log("auth emulators");
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);
    console.log("connected to emulators");
  }
  return services;
}

export function newOrder(data) {
  const { functions } = getFirebase();
  const newOrder = httpsCallable(functions, 'newOrder');
  return newOrder(data)
}

