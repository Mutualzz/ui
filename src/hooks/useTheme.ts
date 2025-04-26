import { ThemeContext } from "@root/ThemeProvider";
import { type ThemeContextInterface } from "@root/types";
import { useContext } from "react";

export const useTheme = (): ThemeContextInterface => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
