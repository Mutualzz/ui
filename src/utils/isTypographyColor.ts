import type { ThemeTypographyColor } from "../types";

export const isTypographyColor = (
    color: unknown,
): color is ThemeTypographyColor => {
    return (
        typeof color === "string" &&
        ["primary", "neutral", "accent"].includes(color)
    );
};
