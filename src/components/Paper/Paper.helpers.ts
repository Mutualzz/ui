import type { Theme } from "@emotion/react";
import { type Color, type ColorLike, type TypographyColor } from "@ui-types";
import { alpha, dynamicElevation, getLuminance } from "@utils";
import { resolveColor, resolveTypographyColor } from "@utils/resolveColor";
import { formatHex8 } from "culori";

export const resolvePaperStyles = (
    theme: Theme,
    color: Color | ColorLike,
    textColor: TypographyColor | "inherit",
    elevation: number,
) => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);

    const bgLuminance = getLuminance(resolvedColor);

    const resolvedTextColor =
        textColor === "inherit"
            ? resolvedColor
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
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(resolvedColor)}`,
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
