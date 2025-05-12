import type { Theme } from "@emotion/react";
import type { Breakpoint } from "types";
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

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
        up: (key: Breakpoint) =>
            `@media (min-width:${baseDarkTheme.breakpoints.values[key]}px)`,
        down: (key: Breakpoint) =>
            `@media (max-width:${baseDarkTheme.breakpoints.values[key]}px)`,
        between: (start: Breakpoint, end: Breakpoint) =>
            `@media (min-width:${baseDarkTheme.breakpoints.values[start]}px) and (max-width:${baseDarkTheme.breakpoints.values[end]}px)`,
        only: (key: Breakpoint) =>
            `@media (min-width:${baseDarkTheme.breakpoints.values[key]}px) and (max-width:${baseDarkTheme.breakpoints.values[key] + 0.02}px)`,
        not: (key: Breakpoint) =>
            `@media not all and (min-width:${baseDarkTheme.breakpoints.values[key]}px)`,
    },

    spacing: (factor: number) => `${0.25 * factor}rem`,
};
