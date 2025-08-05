import type { CSSObject, Theme } from "@emotion/react";
import type {
    Color,
    ColorLike,
    Size,
    SizeValue,
    TypographyColor,
    Variant,
} from "@ui-types";
import { darken, lighten } from "@utils";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColor";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveTextareaSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        fontSize: resolvedSize,
        lineHeight: 1.5,
        minHeight: `${resolvedSize + (resolvedSize / 2) * 2}px`,
        whiteSpace: "nowrap",
        flexShrink: 0,
    };
};

export const resolveTextareaStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | "inherit",
): Record<Variant, CSSObject> => {
    const resolvedColor = resolveColor(color, theme);

    const resolvedTextColor =
        textColor === "inherit"
            ? resolvedColor
            : resolveTypographyColor(textColor, theme);

    return {
        outlined: {
            background: "transparent",
            color: formatHex8(lighten(resolvedTextColor, 0.5)),
            border: `1px solid ${formatHex8(resolvedColor)}`,
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(resolvedColor)}`,
            },
        },
        solid: {
            background: formatHex8(resolvedColor),
            color: formatHex8(lighten(resolvedTextColor, 0.75)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(resolvedColor)}`,
            },
        },
        plain: {
            background: "transparent",
            color: formatHex8(lighten(resolvedTextColor, 0.25)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(resolvedColor)}`,
            },
        },
        soft: {
            background: formatHex8(darken(resolvedColor, 0.5)),
            color: formatHex8(lighten(resolvedTextColor, 0.5)),
            border: "none",
            borderRadius: 8,
            ":focus": {
                outline: `2px solid ${formatHex8(resolvedColor)}`,
            },
        },
    };
};
