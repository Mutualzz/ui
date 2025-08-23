import type { ColorLike } from "@ui-types";
import { clampChroma, formatHex, lch } from "culori";
import { adjustLightness } from "./adjustLightness";
import { alpha } from "./alpha";
import { isValidGradient } from "./colorRegex";
import { dynamicElevation } from "./dynamicElevation";
import { getLuminance } from "./getLuminance";
import { extractGradientStops, reconstructGradient } from "./gradients";
import { randomColor } from "./randomColor";
import {
    isThemeColor,
    isTypographyColor,
    resolveColor,
    resolveColorFromLuminance,
    resolveTypographyColor,
} from "./resolveColors";
import { cssUnitRegex, resolveSize } from "./resolveSize";
import { setRef } from "./setRef";
import { useEnhancedEffect } from "./useEnhancedEffect";
import { useForkRef } from "./useForkRef";
import visuallyHidden from "./visuallyHidden";

export {
    adjustLightness,
    alpha,
    cssUnitRegex,
    dynamicElevation,
    getLuminance,
    isThemeColor,
    isTypographyColor,
    randomColor,
    resolveColor,
    resolveColorFromLuminance,
    resolveSize,
    resolveTypographyColor,
    setRef,
    useEnhancedEffect,
    useForkRef,
    visuallyHidden,
};

export function darken(color: ColorLike, factor: number) {
    if (isValidGradient(color)) {
        const stops = extractGradientStops(color);

        const stopsDarkened = stops.map((stop) => {
            const colorLch = lch(stop);
            if (!colorLch) return stop;
            colorLch.l = Math.max(0, colorLch.l * (1 - factor));
            return formatHex(clampChroma(colorLch));
        });

        return reconstructGradient(color, stopsDarkened);
    }

    const colorLch = lch(color);
    if (!colorLch) return color;

    colorLch.l = Math.max(0, colorLch.l * (1 - factor));

    return formatHex(clampChroma(colorLch));
}

export function getScrollableAncestors(
    node: HTMLElement | null,
): (HTMLElement | Window)[] {
    const ancestors: (HTMLElement | Window)[] = [window];
    let current = node?.parentElement;
    while (current) {
        const style = getComputedStyle(current);
        if (
            /(auto|scroll)/.test(
                style.overflow + style.overflowY + style.overflowX,
            )
        ) {
            ancestors.push(current);
        }
        current = current.parentElement;
    }
    return ancestors;
}

export const lighten = (color: ColorLike, factor: number) => {
    if (isValidGradient(color)) {
        const stops = extractGradientStops(color);

        const stopsLightened = stops.map((stop) => {
            const colorLch = lch(stop);
            if (!colorLch) return stop;
            colorLch.l = Math.min(
                100,
                colorLch.l + (100 - colorLch.l) * factor,
            );
            return formatHex(clampChroma(colorLch));
        });

        return reconstructGradient(color, stopsLightened);
    }

    const colorLch = lch(color);
    if (!colorLch) return color;

    colorLch.l = Math.min(100, colorLch.l + (100 - colorLch.l) * factor);

    return formatHex(clampChroma(colorLch));
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
