import { clampChroma, lch, type Color } from "culori";
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

export const darken = (color: Color, factor: number) => {
    const colorLch = lch(color);

    colorLch.l = Math.max(0, colorLch.l * (1 - factor));

    return clampChroma(colorLch);
};

export const lighten = (color: Color, factor: number) => {
    const colorLch = lch(color);

    colorLch.l = Math.min(100, colorLch.l + (100 - colorLch.l) * factor);

    return clampChroma(colorLch);
};
