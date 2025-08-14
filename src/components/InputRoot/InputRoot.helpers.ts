import type { CSSObject, Theme } from "@emotion/react";
import type {
    Color,
    ColorLike,
    Size,
    SizeValue,
    TypographyColor,
    Variant,
} from "@ui-types";
import { darken, getLuminance, lighten } from "@utils";
import { isValidColorInput } from "@utils/colorRegex";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColor";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 14,
    md: 16,
    lg: 18,
};

export const resolveInputBaseSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        fontSize: resolvedSize,
        lineHeight: 1,
        minHeight: `${resolvedSize + (resolvedSize / 2) * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const resolveInputBaseStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | ColorLike | "inherit",
    error: boolean,
): Record<Variant, CSSObject> => {
    const resolvedColor = resolveColor(color, theme);

    const parsedTextColor =
        textColor === "inherit"
            ? resolvedColor
            : resolveTypographyColor(textColor, theme);

    const errorColor = theme.colors.danger;
    const isColorLike = isValidColorInput(parsedTextColor);

    const luminance = getLuminance(resolvedColor);
    const luminatedColor = (
        isColorLike
            ? (formatHex8(
                  luminance < 0.5
                      ? theme.colors.common.white
                      : theme.colors.common.black,
              ) ?? parsedTextColor)
            : parsedTextColor
    ) as ColorLike;

    return {
        outlined: {
            background: "transparent",
            color: formatHex8(
                isColorLike
                    ? parsedTextColor
                    : lighten(error ? errorColor : parsedTextColor, 0.5),
            ),
            border: `1px solid ${formatHex8(error ? errorColor : resolvedColor)}`,
            borderRadius: 8,
            ":focus": {
                border: `2px solid ${formatHex8(error ? errorColor : resolvedColor)}`,
            },
        },
        solid: {
            background: formatHex8(error ? errorColor : resolvedColor),
            color: formatHex8(
                isColorLike
                    ? luminatedColor
                    : lighten(error ? errorColor : parsedTextColor, 0.75),
            ),
            border: "none",
            borderRadius: 8,
            ":focus": {
                border: `2px solid ${formatHex8(error ? errorColor : resolvedColor)}`,
            },
        },
        plain: {
            background: "transparent",
            color: formatHex8(
                isColorLike
                    ? parsedTextColor
                    : lighten(error ? errorColor : parsedTextColor, 0.25),
            ),
            border: "none",
            borderRadius: 8,
            ":focus": {
                border: `2px solid ${formatHex8(error ? errorColor : resolvedColor)}`,
            },
        },
        soft: {
            background: formatHex8(
                darken(error ? errorColor : resolvedColor, 0.5),
            ),
            color: formatHex8(
                isColorLike
                    ? luminatedColor
                    : lighten(error ? errorColor : parsedTextColor, 0.5),
            ),
            border: "none",
            borderRadius: 8,
            ":focus": {
                border: `2px solid ${formatHex8(error ? errorColor : resolvedColor)}`,
            },
        },
    };
};
