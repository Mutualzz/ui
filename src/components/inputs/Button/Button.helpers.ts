import { css } from "@emotion/react";
import { alpha } from "../../../utils/alpha";
import { isThemeColor } from "../../../utils/isThemeColor";
import { readableTextColor } from "../../../utils/readableTextColor";

import { formatHex8, parse, rgb } from "culori";
import type { Color, ColorLike, Size, Theme } from "../../../types";

const minSize = 10,
    maxSize = 24;

export const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveButtonStyles = (size: Size | number) => {
    let base = size;
    if (typeof size === "string") base = baseSizeMap[size];

    if (typeof base === "string") base = parseFloat(base);
    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;
    if (isNaN(base)) base = baseSizeMap.md;

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

    const parsedColor = parse(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const typographyPrimary = rgb(colors.common.white);
    if (!typographyPrimary) throw new Error("Invalid color");

    const textColorDefault = readableTextColor(
        resolvedColor,
        colors.common.white,
        2,
    );

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: textColorDefault,
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.8),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.6),
            },
            "&:disabled": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: alpha(typographyPrimary, 0.4),
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
