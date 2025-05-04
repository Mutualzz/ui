import type { Theme } from "../types";

export const baseLightTheme: Theme = {
    id: "baseLight",
    name: "Silken Dawn",
    description: "Default Light Theme",
    type: "light",
    colors: {
        common: {
            white: "#FFFFFF",
            black: "#121212",
        },
        primary: "#A84E68",
        neutral: "#6A6A6A",
        background: "#F2F2F2",
        surface: "#E0E0E0",
        danger: "#B54254",
        warning: "#C78F2A",
        success: "#3D9242",
        info: "#496C99",
        typography: {
            primary: "#121212",
            neutral: "#5A5A5A",
            accent: "#6B425C",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
    },
};
