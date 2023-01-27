import React from "react";
import AuthProvider from "../../context/AuthContext";
import MenuProvider from "../../context/MenuContext";

export default function Provider({ children }) {
  return (
    <>
      <AuthProvider>
        <MenuProvider>{children}</MenuProvider>
      </AuthProvider>
    </>
  );
}
