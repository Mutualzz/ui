import { Theme } from "types";

export const typographyCommon: Pick<Theme, "typography"> = {
    typography: {
        fontFamily: "Inter, sans-serif",
        levels: {
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
        },
    },
};
