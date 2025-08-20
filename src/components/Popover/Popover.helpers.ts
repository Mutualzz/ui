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
    resolveColorFromLuminance,
    resolveSize,
    resolveTypographyColor,
} from "@utils";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const resolvePopoverSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        fontSize: resolvedSize,
        padding: `${resolvedSize * 0.6}px ${resolvedSize * 0.8}px`,
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

    const solidTextColor = resolveColorFromLuminance(bgLuminance, theme);
    const textColorWithFallback =
        formatHex8(resolvedTextColor) ?? theme.typography.colors.muted;

    return {
        elevation: {
            backgroundColor: dynamicElevation(colors.surface, elevation),
            boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
        },
        solid: {
            backgroundColor: formatHex8(resolvedColor) ?? colors.primary,
            color: solidTextColor,
            border: "none",
        },
        outlined: {
            backgroundColor: colors.background,
            border: `1px solid ${formatHex8(resolvedColor)}`,
            color: textColorWithFallback,
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.1)),
            border: "none",
            color: textColorWithFallback,
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: textColorWithFallback,
        },
    };
};
