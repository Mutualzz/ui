import type { Theme } from "@emotion/react";
import { useTheme } from "../hooks/useTheme";
import { type Color, type ColorLike } from "../types";
import { isThemeColor } from "./isThemeColor";

export const resolveColor = (color: Color | ColorLike, theme: Theme) =>
    isThemeColor(color) ? theme.colors[color] : color;

export const useResolvedColor = (color: Color | ColorLike) => {
    const { theme } = useTheme();
    return resolveColor(color, theme);
};
