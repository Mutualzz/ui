import { type Theme } from "@emotion/react";

import { formatHex8 } from "culori";

import type { Color, ColorLike, Size } from "@ui-types";
import { alpha, darken, getLuminance, lighten } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";

const minSize = 10,
    maxSize = 24;

export const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolveButtonSize = (size: Size | number) => {
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

export const resolveButtonStyles = (theme: Theme, color: Color | ColorLike) => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);

    const bgLuminance = getLuminance(resolvedColor);
    const textColor =
        formatHex8(
            bgLuminance < 0.5 ? colors.common.white : colors.common.black,
        ) ?? theme.typography.colors.primary;

    const hexColor = formatHex8(resolvedColor);

    return {
        solid: {
            backgroundColor: hexColor,
            color: textColor,
            border: "none",
            "&:hover": {
                backgroundColor: formatHex8(darken(resolvedColor, 0.2)),
            },
            "&:active": {
                backgroundColor: formatHex8(darken(resolvedColor, 0.4)),
            },
            "&:disabled": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.2)),
                color: formatHex8(alpha(textColor, 0.4)),
            },
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(resolvedColor)}`,
            color: formatHex8(lighten(resolvedColor, 0.6)),
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.2)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
            "&:disabled": {
                color: formatHex8(alpha(resolvedColor, 0.4)),
                border: `1px solid ${formatHex8(alpha(resolvedColor, 0.4))}`,
            },
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: formatHex8(lighten(resolvedColor, 0.25)),
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
                color: formatHex8(lighten(resolvedColor, 0.6)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.5)),
                color: formatHex8(lighten(resolvedColor, 0.5)),
            },
            "&:disabled": {
                color: formatHex8(lighten(resolvedColor, 0.4)),
            },
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.4)),
            color: formatHex8(lighten(resolvedColor, 0.75)),
            border: "none",
            "&:hover": {
                backgroundColor: formatHex8(
                    alpha(lighten(resolvedColor, 0.2), 0.5),
                ),
            },
            "&:active": {
                backgroundColor: formatHex8(
                    alpha(lighten(resolvedColor, 0.5), 0.5),
                ),
            },
            "&:disabled": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.2)),
                color: formatHex8(alpha(resolvedColor, 0.4)),
            },
        },
    };
};
