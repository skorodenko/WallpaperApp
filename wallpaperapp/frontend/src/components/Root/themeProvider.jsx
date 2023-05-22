import React, { createContext } from "react";

export const ThemeContext = createContext({
    theme: null,
})

export default function ThemeProvider({ children, theme }) {
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    )
}