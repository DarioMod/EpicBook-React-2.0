import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext()
export const DarkModeContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode) 
    }
    useEffect(() =>{
        document.body.className = isDarkMode ? "Dark" : "Light"
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}  