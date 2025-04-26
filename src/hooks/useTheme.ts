import { ThemeContext } from "@root/ThemeManager";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
