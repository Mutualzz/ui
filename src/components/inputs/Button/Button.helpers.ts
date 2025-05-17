import { type CSSObject, type Theme } from "@emotion/react";

import { formatHex8, rgb } from "culori";

import type { Color, ColorLike, Size, Variant } from "../../../types";
import {
    adjustTextColor,
    alpha,
    darken,
    getLuminance,
    isThemeColor,
} from "../../../utils";
import type { ButtonGroupOrientation } from "./Button.types";

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
    const horizontalPadding = 10;

    return {
        fontSize: base,
        lineHeight: 1,
        padding: `${verticalPadding}px ${horizontalPadding}px`,
        minHeight: `${base + verticalPadding * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const resolveButtonGroupStyles = (
    { colors }: Theme,
    orientation: ButtonGroupOrientation,
    color: Color | ColorLike = "primary",
    variant: Variant = "solid",
): CSSObject => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const horizontalBorders: Record<Variant, CSSObject> = {
        solid: {
            borderLeft: `1px solid ${formatHex8(darken(parsedColor, 0.5))}`,
        },
        outlined: {},
        plain: {
            borderLeft: `1px solid ${formatHex8(darken(parsedColor, 0.3))}`,
        },
        soft: {
            borderLeft: `1px solid ${formatHex8(darken(parsedColor, 0.1))}`,
        },
    };

    const verticalBorders: Record<Variant, CSSObject> = {
        solid: {
            borderTop: `1px solid ${formatHex8(darken(parsedColor, 0.5))}`,
        },
        outlined: {},
        plain: {
            borderTop: `1px solid ${formatHex8(darken(parsedColor, 0.3))}`,
        },
        soft: {
            borderTop: `1px solid ${formatHex8(darken(parsedColor, 0.1))}`,
        },
    };

    return orientation === "horizontal"
        ? {
              "&:first-of-type": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:not(:first-of-type):not(:last-of-type)": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:last-of-type": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
              },
              "&:not(:first-of-type)": horizontalBorders[variant],
          }
        : {
              "&:first-child": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:not(:first-child):not(:last-child)": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
              },
              "&:last-child": {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
              },
              "&:not(:first-child)": verticalBorders[variant],
          };
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
