import type { CSSObject, Theme } from "@emotion/react";
import { formatHex8, rgb } from "culori";
import type { Color, ColorLike, Size, Variant } from "../../../types";
import { alpha, isThemeColor, lighten } from "../../../utils";

const minThumbSize = 10,
    maxThumbSize = 24;
const minTrackThickness = 2,
    maxTrackThickness = 10;

const thumbSizeMap: Record<Size, number> = {
    sm: 14,
    md: 16,
    lg: 20,
};

export const resolveSliderThumbSize = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    if (base < minThumbSize) base = minThumbSize;
    if (base > maxThumbSize) base = maxThumbSize;

    return base;
};

export const resolveSliderTrackThickness = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    base /= 2.5;

    if (base < minTrackThickness) base = minTrackThickness;
    if (base > maxTrackThickness) base = maxTrackThickness;

    return base;
};

export const resolveSliderTickSize = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thumbSizeMap[size as Size];

    if (base < minThumbSize) base = minThumbSize;
    if (base > maxThumbSize) base = maxThumbSize;

    return base * 0.5;
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

    if (base < minThumbSize) base = minThumbSize;
    if (base > maxThumbSize) base = maxThumbSize;

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
