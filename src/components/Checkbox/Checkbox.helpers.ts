import { type Theme } from "@emotion/react";

import { type Color, type ColorLike, type Size } from "@ui-types";
import { alpha, getLuminance } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const minSize = 10,
    maxSize = 28;

export const baseSizeMap: Record<Size, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

export const resolveCheckboxSize = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    return {
        padding: sizeVal * 0.2,
        lineHeight: 0,
        fontSize: sizeVal * 0.8,
    };
};

export const resolveCheckboxStyles = (
    theme: Theme,
    color: Color | ColorLike,
    checked?: boolean,
) => {
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
                backgroundColor: formatHex8(alpha(resolvedColor, 0.5)),
            },
            "&:active": { backgroundColor: formatHex8(resolvedColor) },
        },
        outlined: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: `1px solid ${formatHex8(alpha(resolvedColor, 0.5))}`,
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
                border: `1px solid ${formatHex8(alpha(resolvedColor, 0.3))}`,
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.15)),
            },
        },
        soft: {
            backgroundColor: formatHex8(
                alpha(resolvedColor, checked ? 0.4 : 0.2),
            ),
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
        },
        plain: {
            backgroundColor: "transparent",
            color: resolvedColor,
            border: "none",
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.5)),
            },
            "&:active": { color: formatHex8(alpha(resolvedColor, 0.5)) },
        },
    };
};

export const resolveIconScaling = (size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    const scale = sizeVal / 2;

    return {
        width: scale,
        height: scale,
    };
};
