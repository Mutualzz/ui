import type { Theme } from "../types";
import { typographyLevels } from "./commonValues";

export const baseLightTheme: Theme = {
    id: "baseLight",
    name: "Silken Dawn",
    description: "Default Light Theme",
    type: "light",
    colors: {
        common: { white: "#FFFFFF", black: "#121212" },
        primary: "#A84E68",
        neutral: "#6A6A6A",
        background: "#F2F2F2",
        surface: "#E0E0E0",
        danger: "#B54254",
        warning: "#C78F2A",
        success: "#3D9242",
        info: "#496C99",
    },

    typography: {
        levels: { ...typographyLevels },
        fontFamily: "Inter, sans-serif",
        colors: {
            primary: "#333333",
            secondary: "#555555",
            accent: "#A84E68",
            disabled: "#A0A0A0",
        },
    },
};
