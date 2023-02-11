import AuthProvider from "../../context/AuthContext";
import MenuProvider from "../../context/MenuContext";
import OrderProvider from "../../context/OrderContext";

export default function Provider({ children }) {
  return (
    <>
      <AuthProvider>
        <MenuProvider>
          <OrderProvider>{children}</OrderProvider>
        </MenuProvider>
      </AuthProvider>
    </>
  );
}
