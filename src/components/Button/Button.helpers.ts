import { type Theme } from "@emotion/react";

import { formatHex8, parse } from "culori";

import type { Color, ColorLike, Size } from "@ui-types";
import { adjustTextColor, alpha, getLuminance, lighten } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";

const minSize = 10,
    maxSize = 24;

export const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveButtonStyles = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);
    const padding = 10;

    return {
        fontSize: sizeVal,
        lineHeight: 1,
        padding: `${padding}px ${padding}px`,
        minHeight: `${sizeVal + padding * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const variantColors = (theme: Theme, color: Color | ColorLike) => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = parse(
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
                color: formatHex8(lighten(parsedColor, 0.6)),
            },
            "&:active": {
                color: formatHex8(lighten(parsedColor, 0.5)),
            },
            "&:disabled": {
                color: formatHex8(lighten(parsedColor, 0.4)),
            },
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            color: formatHex8(parsedColor),
            border: "none",
            "&:hover": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: formatHex8(lighten(parsedColor, 0.2)),
            },
            "&:active": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: formatHex8(lighten(parsedColor, 0.1)),
            },
            "&:disabled": {
                backgroundColor: alpha(parsedColor, 0.2),
                color: alpha(parsedColor, 0.4),
            },
        },
    };
};
