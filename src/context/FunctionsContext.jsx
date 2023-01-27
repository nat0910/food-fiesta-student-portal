import { createContext } from "react";

const FunctionsContext = createContext();

function FunctionsProvider({ children }) {
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

  return <FunctionsContext.Provider>{children}</FunctionsContext.Provider>;
}
