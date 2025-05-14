import { type Theme } from "@emotion/react";

import { formatHex8, rgb } from "culori";
import { type Color, type ColorLike, type Size } from "../../../types";
import {
    adjustTextColor,
    alpha,
    getLuminance,
    isThemeColor,
} from "../../../utils";

const minSize = 10,
    maxSize = 28;

export const baseSizeMap: Record<Size, number> = {
    sm: 14,
    md: 16,
    lg: 20,
};

export const resolveCheckboxStyles = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = baseSizeMap[size as Size];

    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;

    return {
        padding: base * 0.2,
        lineHeight: 0,
        fontSize: base,
    };
};

export const variantColors = (
    { colors }: Theme,
    color: Color | ColorLike,
    checked?: boolean,
) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = rgb(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: resolvedColor,
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
            "&:hover": { backgroundColor: alpha(parsedColor, 0.5) },
            "&:active": { backgroundColor: resolvedColor },
        },
        outlined: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: `1px solid ${alpha(parsedColor, 0.5)}`,
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.3),
                border: `1px solid ${alpha(parsedColor, 0.3)}`,
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.15),
            },
        },
        soft: {
            backgroundColor: alpha(parsedColor, checked ? 0.4 : 0.2),
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.3),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.3),
            },
        },
        plain: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.5),
            },
            "&:active": { color: alpha(parsedColor, 0.5) },
        },
    };
};

export const resolveIconScaling = (size: Size | number) => {
    let base = size;
    if (typeof size === "string") base = baseSizeMap[size];

    if (typeof base === "string") base = parseFloat(base);
    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;
    if (isNaN(base)) base = baseSizeMap.md;

    const scale = base / 2;

    return {
        width: scale,
        height: scale,
    };
};
