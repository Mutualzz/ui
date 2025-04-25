import type { TypographyColor } from "@mutualzz/ui/src/types";

export const isTypographyColor = (color: unknown): color is TypographyColor => {
    return (
        typeof color === "string" &&
        ["primary", "neutral", "accent"].includes(color)
    );
};
