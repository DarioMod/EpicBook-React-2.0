import { createContext, useState } from "react";
import { getFromLocalStorage } from "../utility/localstorage";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const initialData = getFromLocalStorage("cart") || [];

  const [cart, setCart] = useState(initialData);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
