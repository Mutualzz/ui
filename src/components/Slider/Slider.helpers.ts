import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Size, SizeValue, Variant } from "@ui-types";
import { alpha, lighten } from "@utils";
import { resolveColor } from "@utils/resolveColor";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const minFontSize = 10,
    maxFontSize = 16;

const thumbSizeMap: Record<Size, number> = {
    sm: 14,
    md: 18,
    lg: 24,
};

export const resolveSliderThumbSize = (
    theme: Theme,
    size: Size | SizeValue | number,
): CSSObject => {
    const resolvedSize = resolveSize(theme, size, thumbSizeMap);

    return {
        width: resolvedSize,
        height: resolvedSize,
        borderRadius: resolvedSize / 2,
    };
};

export const resolveSliderTrackThickness = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, thumbSizeMap);

    return Math.round(resolvedSize / 2.5);
};

export const resolveSliderTickSize = (
    theme: Theme,
    size: Size | SizeValue | number,
): CSSObject => {
    const resolvedSize = resolveSize(theme, size, thumbSizeMap);

    const tickSize = Math.round(resolvedSize * 0.2);

    return {
        width: tickSize,
        height: tickSize,
    };
};

export const resolveSliderLabelSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
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
    theme: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const resolvedColor = resolveColor(color, theme);

    return {
        solid: {
            backgroundColor: hovered
                ? formatHex8(alpha(resolvedColor, 0.85))
                : formatHex8(resolvedColor),
        },
        outlined: {
            border: hovered
                ? `1px solid ${formatHex8(alpha(resolvedColor, 0.5))}`
                : `1px solid ${formatHex8(resolvedColor)}`,
            backgroundColor: hovered
                ? formatHex8(alpha(resolvedColor, 0.35))
                : "transparent",
        },
        plain: {
            backgroundColor: hovered
                ? formatHex8(alpha(resolvedColor, 0.5))
                : "transparent",
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(alpha(resolvedColor, 0.5))
                : formatHex8(alpha(resolvedColor, 0.3)),
        },
    };
};

export const resolveSliderThumbStyles = (
    theme: Theme,
    color: Color | ColorLike,
    hovered: boolean,
): Record<Variant, CSSObject> => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);

    return {
        solid: {
            backgroundColor: colors.common.white,
            border: hovered
                ? `2px solid ${formatHex8(alpha(resolvedColor, 0.85))}`
                : `2px solid ${formatHex8(resolvedColor)}`,
        },
        outlined: {
            padding: 2,
            backgroundColor: formatHex8(lighten(resolvedColor, 0.7)),
            border: `1px solid ${formatHex8(resolvedColor)}`,
        },
        plain: {
            backgroundColor: formatHex8(lighten(resolvedColor, 0.5)),
        },
        soft: {
            backgroundColor: hovered
                ? formatHex8(lighten(resolvedColor, 0.5))
                : formatHex8(lighten(resolvedColor, 0.7)),
            border: hovered
                ? `2px solid ${formatHex8(alpha(resolvedColor, 0.85))}`
                : `2px solid ${formatHex8(resolvedColor)}`,
        },
    };
};
