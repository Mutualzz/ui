import type { Theme } from "@emotion/react";
import { type Color, type ColorLike, type TypographyColor } from "@ui-types";
import { alpha, dynamicElevation, getLuminance } from "@utils";
import {
    resolveColor,
    resolveColorFromLuminance,
    resolveTypographyColor,
} from "@utils/resolveColors";
import { formatHex8 } from "culori";

export const resolvePaperStyles = (
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
            ? resolvedColor
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
            backgroundColor: colors.surface,
            border: `1px solid ${formatHex8(alpha(resolvedColor, 0.3))}`,
            color: textColorWithFallback,
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: textColorWithFallback,
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.1)),
            border: "none",
            color: textColorWithFallback,
        },
    };
};
