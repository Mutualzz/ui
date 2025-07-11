import { clampChroma, lch, type Color, type Lch } from "culori";
import { adjustLightness } from "./adjustLightness";
import { adjustTextColor } from "./adjustTextColor";
import { alpha } from "./alpha";
import { blendOver } from "./blendOver";
import { dynamicElevation } from "./dynamicElevation";
import { getContrastRatio } from "./getContrastRatio";
import { getLuminance } from "./getLuminance";
import { isThemeColor } from "./isThemeColor";
import { randomHexColor } from "./randomHexColor";
import { sortThemes } from "./sortThemes";

export {
    adjustLightness,
    adjustTextColor,
    alpha,
    blendOver,
    dynamicElevation,
    getContrastRatio,
    getLuminance,
    isThemeColor,
    randomHexColor,
    sortThemes,
};

export function darken(color: string, factor: number): Lch;
export function darken(color: Color, factor: number): Lch;
export function darken(color: Color | string, factor: number): Lch {
    const colorLch = lch(color);
    if (!colorLch) throw new Error("Invalid color provided to darken function");

    colorLch.l = Math.max(0, colorLch.l * (1 - factor));

    return clampChroma(colorLch);
}

export const lighten = (color: Color, factor: number) => {
    const colorLch = lch(color);

    colorLch.l = Math.min(100, colorLch.l + (100 - colorLch.l) * factor);

    return clampChroma(colorLch);
};
