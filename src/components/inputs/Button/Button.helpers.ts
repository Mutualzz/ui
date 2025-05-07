import { css, type Theme } from "@emotion/react";

import { formatHex8, rgb } from "culori";

import type { Color, ColorLike, Size } from "../../../types";
import {
    adjustTextColor,
    alpha,
    getLuminance,
    isThemeColor,
} from "../../../utils";

const minSize = 10,
    maxSize = 24;

export const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveButtonStyles = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = baseSizeMap[size as Size];

    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;

    const verticalPadding = 10;
    const horizontalPadding = 20;

    return css({
        height: `${base + verticalPadding * 2}px`,
        fontSize: base,
        lineHeight: 1,
        padding: `0 ${horizontalPadding}px`,
    });
};

export const variantColors = ({ colors }: Theme, color: Color | ColorLike) => {
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
            backgroundColor: formatHex8(parsedColor),
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.8),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.6),
            },
            "&:disabled": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: alpha(textColor, 0.4),
            },
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(parsedColor)}`,
            color: formatHex8(parsedColor),
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.2),
                border: `1px solid ${alpha(parsedColor, 0.1)}`,
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.1),
            },
            "&:disabled": {
                color: alpha(parsedColor, 0.4),
                border: `1px solid ${alpha(parsedColor, 0.4)}`,
            },
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: formatHex8(parsedColor),
            "&:hover": {
                color: alpha(parsedColor, 0.8),
            },
            "&:active": {
                color: alpha(parsedColor, 0.5),
            },
            "&:disabled": {
                color: alpha(parsedColor, 0.4),
            },
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            color: formatHex8(parsedColor),
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.3),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.2),
            },
            "&:disabled": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: alpha(parsedColor, 0.4),
            },
        },
    };
};
