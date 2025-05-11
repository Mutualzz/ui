import type { Breakpoint } from "types";

export const typographyLevels = {
    "body-xs": {
        fontSize: "0.75rem",
        lineHeight: 1.17,
        fontWeight: 400,
        letterSpacing: "0.01em",
    },
    "body-sm": {
        fontSize: "0.875rem",
        lineHeight: 1.43,
        fontWeight: 400,
        letterSpacing: "0.01em",
    },
    "body-md": {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: "0.01em",
    },
    "body-lg": {
        fontSize: "1.125rem",
        lineHeight: 1.56,
        fontWeight: 400,
        letterSpacing: "0.01em",
    },
    "title-sm": {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: 0,
    },
    "title-md": {
        fontSize: "1.25rem",
        lineHeight: 1.6,
        fontWeight: 500,
        letterSpacing: 0,
    },
    "title-lg": {
        fontSize: "1.5rem",
        lineHeight: 1.33,
        fontWeight: 500,
        letterSpacing: 0,
    },
    h1: {
        fontSize: "2.25rem",
        lineHeight: 1.22,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    h2: {
        fontSize: "2rem",
        lineHeight: 1.25,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    h3: {
        fontSize: "1.75rem",
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    h4: {
        fontSize: "1.5rem",
        lineHeight: 1.33,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    h5: {
        fontSize: "1.25rem",
        lineHeight: 1.6,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    h6: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: "-0.02em",
    },
    "display-xs": {
        fontSize: "2rem",
        lineHeight: 1.25,
        fontWeight: 700,
        letterSpacing: "-0.02em",
    },
    "display-sm": {
        fontSize: "2.5rem",
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: "-0.02em",
    },
    "display-md": {
        fontSize: "3rem",
        lineHeight: 1.17,
        fontWeight: 700,
        letterSpacing: "-0.02em",
    },
    "display-lg": {
        fontSize: "3.75rem",
        lineHeight: 1.13,
        fontWeight: 700,
        letterSpacing: "-0.02em",
    },
};

export const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

const breakpointKeys = Object.keys(breakpoints);

export const mediaUp = (breakpoint: Breakpoint) =>
    `@media (min-width: ${breakpoints[breakpoint]}px)`;

export const mediaDown = (breakpoint: Breakpoint) => {
    const next = breakpointKeys[breakpointKeys.indexOf(breakpoint) + 1];
    return next
        ? `@media (max-width: ${breakpoints[next as keyof typeof breakpoints] - 0.05}px)`
        : "";
};

export const mediaBetween = (start: Breakpoint, end: Breakpoint) =>
    `@media (min-width: ${breakpoints[start]}px) and (max-width: ${breakpoints[end] - 0.05}px)`;

export const mediaOnly = (key: Breakpoint) => {
    const next = breakpointKeys[breakpointKeys.indexOf(key) + 1];
    return next
        ? `@media (min-width: ${breakpoints[key]}px) and (max-width: ${breakpoints[next as keyof typeof breakpoints] - 0.05}px)`
        : mediaUp(key);
};

export const mediaNot = (key: Breakpoint) => {
    const next = breakpointKeys[breakpointKeys.indexOf(key) + 1];
    return next
        ? `@media (min-width: ${breakpoints[key]}px) and (max-width: ${breakpoints[next as keyof typeof breakpoints] - 0.05}px)`
        : mediaDown(key);
};
