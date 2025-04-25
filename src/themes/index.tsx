import type { Theme, Themes } from "../types";
import { baseDarkTheme } from "./baseDark";
import { baseLightTheme } from "./baseLight";

export const themesObj: Record<Themes, Theme> = {
    baseDark: baseDarkTheme,
    baseLight: baseLightTheme,
};

export const themes = Object.values(themesObj);
