import type { ColorLike } from "@ui-types";
import { clampChroma, lch } from "culori";
import { adjustLightness } from "./adjustLightness";
import { alpha } from "./alpha";
import { blendOver } from "./blendOver";
import { dynamicElevation } from "./dynamicElevation";
import { getContrastRatio } from "./getContrastRatio";
import { getLuminance } from "./getLuminance";
import { randomColor } from "./randomColor";
import {
    isThemeColor,
    isTypographyColor,
    resolveColor,
    resolveTypographyColor,
} from "./resolveColor";
import { cssUnitRegex, resolveSize } from "./resolveSize";
import { setRef } from "./setRef";
import { useEnhancedEffect } from "./useEnhancedEffect";
import { useForkRef } from "./useForkRef";
import visuallyHidden from "./visuallyHidden";

export {
    adjustLightness,
    alpha,
    blendOver,
    cssUnitRegex,
    dynamicElevation,
    getContrastRatio,
    getLuminance,
    isThemeColor,
    isTypographyColor,
    randomColor,
    resolveColor,
    resolveSize,
    resolveTypographyColor,
    setRef,
    useEnhancedEffect,
    useForkRef,
    visuallyHidden,
};

export function darken(color: ColorLike, factor: number) {
    const colorLch = lch(color);
    if (!colorLch) return color;

    colorLch.l = Math.max(0, colorLch.l * (1 - factor));

    return clampChroma(colorLch);
}

export const lighten = (color: ColorLike, factor: number) => {
    const colorLch = lch(color);
    if (!colorLch) return color;

    colorLch.l = Math.min(100, colorLch.l + (100 - colorLch.l) * factor);

    return clampChroma(colorLch);
};

export const allowedListStyleTypes = [
    "disc",
    "circle",
    "square",
    "decimal",
    "decimal-leading-zero",
    "lower-roman",
    "upper-roman",
    "lower-alpha",
    "upper-alpha",
    "lower-latin",
    "upper-latin",
    "armenian",
    "georgian",
    "lower-greek",
    "lower-armenian",
    "upper-armenian",
    "hebrew",
    "cjk-earthly-branch",
    "cjk-heavenly-stem",
    "hiragana",
    "hiragana-iroha",
    "katakana",
    "katakana-iroha",
    "japanese-formal",
    "japanese-informal",
    "korean-hangul-formal",
    "korean-hanja-formal",
    "korean-hanja-informal",
    "simp-chinese-formal",
    "simp-chinese-informal",
    "trad-chinese-formal",
    "trad-chinese-informal",
    "disclosure-open",
    "disclosure-closed",
    "none",
] as const;

export const isCssMarker = (
    marker: any,
): marker is (typeof allowedListStyleTypes)[number] => {
    return allowedListStyleTypes.includes(marker);
};

export const clamp = (number: number, min = 0, max = 1): number => {
    return number > max ? max : number < min ? min : number;
};

export const round = (
    number: number,
    digits = 0,
    base = Math.pow(10, digits),
): number => {
    return Math.round(base * number) / base;
};
