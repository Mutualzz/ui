import type { Theme } from "../types";
import { typographyLevels } from "./commonValues";

export const baseDarkTheme: Theme = {
    id: "baseDark",
    name: "Ashen Dusk",
    description: "Default Dark Theme",
    type: "dark",
    colors: {
        common: { white: "#E8E8E8", black: "#121212" },
        primary: "#6B425C",
        neutral: "#5A5A5A",
        background: "#0B0B0B",
        surface: "#1A1A1A",
        danger: "#A12B3D",
        warning: "#D4A033",
        success: "#4CAF50",
        info: "#5A84B1",
    },
    typography: {
        levels: { ...typographyLevels },
        fontFamily: "Inter, sans-serif",
        colors: {
            primary: "#E8E8E8",
            secondary: "#B5B5B5",
            accent: "#C27896",
            disabled: "#5A5A5A",
        },
    },
};
