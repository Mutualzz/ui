import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import { type ThemeContextInterface } from "../types";

export const useTheme = (): ThemeContextInterface => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
