import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { BookContextProvider } from "./contexts/BookContext.jsx";
import "./index.css";
import { CartContextProvider } from "./contexts/CartContext.jsx";
import { DarkModeContextProvider } from "./contexts/DarkmodeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeContextProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <BookContextProvider>
          <App />
        </BookContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>
);
