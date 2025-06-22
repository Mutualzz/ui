import type { CSSObject } from "@emotion/react";
import { formatHex8, rgb } from "culori";
import { useTheme } from "../../../hooks/useTheme";
import type { Color, ColorLike, Size, Variant } from "../../../types";
import { darken, isThemeColor, lighten } from "../../../utils";
import { resolveSize } from "../../../utils/resolveSize";

const minSize = 6,
    maxSize = 24;

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveInputSize = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    return {
        fontSize: sizeVal,
        lineHeight: 1,
        paddingInline: `${sizeVal / 2}px ${sizeVal / 2}px`,
        minHeight: `${sizeVal + (sizeVal / 2) * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const resolveInputStyles = (
    color: Color | ColorLike,
): Record<Variant, CSSObject> => {
    const {
        theme: { colors },
    } = useTheme();
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    return {
        outlined: {
            background: "transparent",
            color: formatHex8(lighten(parsedColor, 0.5)),
            border: `1px solid ${formatHex8(parsedColor)}`,
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        solid: {
            background: formatHex8(parsedColor),
            color: formatHex8(lighten(parsedColor, 0.75)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        plain: {
            background: "transparent",
            color: formatHex8(lighten(parsedColor, 0.25)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
        soft: {
            background: formatHex8(darken(parsedColor, 0.5)),
            color: formatHex8(lighten(parsedColor, 0.5)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(parsedColor)}`,
            },
        },
    };
};
