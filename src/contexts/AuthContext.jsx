import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const [formState, setFormState] = useState({
    username: "emilys",
    password: "emilyspass",
  });

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: `POST`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = await response.json();
      setCurrentUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, formState, setFormState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
