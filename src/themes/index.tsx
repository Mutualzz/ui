import type { Theme } from "../types";
import { baseDarkTheme } from "./baseDark";
import { baseLightTheme } from "./baseLight";

export const themesObj: Record<string, Theme> = {
    baseDark: baseDarkTheme,
    baseLight: baseLightTheme,
};

export const themes = Object.values(themesObj);
