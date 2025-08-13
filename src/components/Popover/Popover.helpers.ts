import type { Theme } from "@emotion/react";
import type {
    Color,
    ColorLike,
    Size,
    SizeValue,
    TypographyColor,
} from "@ui-types";
import {
    alpha,
    dynamicElevation,
    getLuminance,
    resolveColor,
    resolveSize,
    resolveTypographyColor,
} from "@utils";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 14,
    md: 16,
    lg: 18,
};

export const resolvePopoverSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        padding: resolvedSize,
    };
};

export const resolvePopoverStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | ColorLike | "inherit",
    elevation: number,
) => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);

    const bgLuminance = getLuminance(resolvedColor);

    const resolvedTextColor =
        textColor === "inherit"
            ? "inherit"
            : resolveTypographyColor(textColor, theme);

    const solidTextColor =
        formatHex8(
            bgLuminance < 0.5 ? colors.common.white : colors.common.black,
        ) ?? theme.typography.colors.primary;

    const textColorWithFallback =
        formatHex8(resolvedTextColor) ?? theme.typography.colors.primary;

    return {
        elevation: {
            backgroundColor: dynamicElevation(colors.surface, elevation),
            boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
        },
        solid: {
            backgroundColor: formatHex8(resolvedColor) ?? colors.primary,
            color:
                formatHex8(solidTextColor) ?? theme.typography.colors.primary,
            border: "none",
        },
        outlined: {
            backgroundColor: formatHex8(theme.colors.background),
            border: `1px solid ${formatHex8(resolvedColor)}`,
            color: textColorWithFallback,
        },
        plain: {
            backgroundColor: formatHex8(theme.colors.background),
            border: "none",
            color: textColorWithFallback,
            boxShadow: `0 1px 5px ${formatHex8(resolvedColor)}`,
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.5)),
            border: "none",
            color: textColorWithFallback,
        },
    };
};
