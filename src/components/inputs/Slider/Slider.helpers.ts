import type { CSSObject, Theme } from "@emotion/react";
import { formatHex8, rgb } from "culori";
import type { Color, ColorLike, Size, Variant } from "../../../types";
import { alpha, isThemeColor, lighten } from "../../../utils";

const minThumbSize = 10,
    maxThumbSize = 28;

const minFontSize = 10,
    maxFontSize = 16;

const thumbSizeMap: Record<Size, number> = {
    sm: 14,
    md: 18,
    lg: 24,
};

export const resolveSliderThumbSize = (size: Size | number): CSSObject => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    if (base < minThumbSize) base = minThumbSize;
    if (base > maxThumbSize) base = maxThumbSize;

    return {
        width: base,
        height: base,
        borderRadius: base / 2,
    };
};

export const resolveSliderTrackThickness = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    return Math.round(base / 2.5);
};

export const resolveSliderTickSize = (size: Size | number): CSSObject => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    if (base < minThumbSize) base = minThumbSize;
    if (base > maxThumbSize) base = maxThumbSize;

    const tickSize = Math.round(base * 0.2);

    return {
        width: tickSize,
        height: tickSize,
    };
};

export const resolveSliderLabelSize = (theme: Theme, size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) {
        switch (size) {
            case "sm":
                base = theme.typography.levels["body-xs"].fontSize;
                break;
            case "md":
                base = theme.typography.levels["body-sm"].fontSize;
                break;
            case "lg":
                base = theme.typography.levels["body-md"].fontSize;
                break;
        }
    }

    if (base < minFontSize) base = minFontSize;
    if (base > maxFontSize) base = maxFontSize;

    return base;
};

export const resolveSliderTrackStyles = (
    { colors }: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error(`Invalid color: ${color}`);

    return {
        solid: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.85))
                : formatHex8(parsedColor),
        },
        outlined: {
            border: hovered
                ? `1px solid ${formatHex8(alpha(parsedColor, 0.5))}`
                : `1px solid ${formatHex8(parsedColor)}`,
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.35))
                : "transparent",
        },
        plain: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.5))
                : "transparent",
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(alpha(parsedColor, 0.5))
                : formatHex8(alpha(parsedColor, 0.3)),
        },
    };
};

export const resolveSliderThumbStyles = (
    { colors }: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error(`Invalid color: ${color}`);

    return {
        solid: {
            backgroundColor: colors.common.white,
            border: hovered
                ? `2px solid ${formatHex8(alpha(parsedColor, 0.85))}`
                : `2px solid ${formatHex8(parsedColor)}`,
        },
        outlined: {
            padding: 2,
            backgroundColor: formatHex8(lighten(parsedColor, 0.7)),
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        plain: {
            backgroundColor: formatHex8(lighten(parsedColor, 0.5)),
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(lighten(parsedColor, 0.5))
                : formatHex8(lighten(parsedColor, 0.7)),
            border: hovered
                ? `2px solid ${formatHex8(alpha(parsedColor, 0.85))}`
                : `2px solid ${formatHex8(parsedColor)}`,
        },
    };
};
