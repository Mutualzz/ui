import type { Theme } from "@emotion/react";
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

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
        up: (key) =>
            `@media (min-width:${baseLightTheme.breakpoints.values[key]}px)`,
        down: (key) =>
            `@media (max-width:${baseLightTheme.breakpoints.values[key]}px)`,
        between: (start, end) =>
            `@media (min-width:${baseLightTheme.breakpoints.values[start]}px) and (max-width:${baseLightTheme.breakpoints.values[end]}px)`,
        only: (key) =>
            `@media (min-width:${baseLightTheme.breakpoints.values[key]}px) and (max-width:${baseLightTheme.breakpoints.values[key] + 0.02}px)`,
        not: (key) =>
            `@media not all and (min-width:${baseLightTheme.breakpoints.values[key]}px)`,
    },

    spacing: (factor: number) => `${0.25 * factor}rem`,
};
