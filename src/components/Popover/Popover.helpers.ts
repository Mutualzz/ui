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
import { isValidGradient } from "@utils/colorRegex";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

export const getBestPlacement = (
    triggerRect: DOMRect,
    popoverRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number,
    offset = 10,
): "bottom" | "top" | "right" | "left" => {
    const space = {
        bottom: viewportHeight - triggerRect.bottom,
        top: triggerRect.top,
        right: viewportWidth - triggerRect.right,
        left: triggerRect.left,
    };
    if (space.bottom >= popoverRect.height + offset) return "bottom";
    if (space.top >= popoverRect.height + offset) return "top";
    if (space.right >= popoverRect.width + offset) return "right";
    if (space.left >= popoverRect.width + offset) return "left";
    return "bottom"; // fallback
};

export const getPopoverPosition = (
    placement: "top" | "bottom" | "left" | "right",
    triggerRect: DOMRect,
    popoverRect: DOMRect,
    scrollTop: number,
    scrollLeft: number,
    offset = 10,
) => {
    switch (placement) {
        case "bottom":
            return {
                top: triggerRect.bottom + scrollTop + offset,
                // Center popover over trigger
                left:
                    triggerRect.left +
                    scrollLeft +
                    (triggerRect.width - popoverRect.width) / 2,
            };
        case "top":
            return {
                top: triggerRect.top + scrollTop - popoverRect.height - offset,
                left:
                    triggerRect.left +
                    scrollLeft +
                    (triggerRect.width - popoverRect.width) / 2,
            };
        case "right":
            return {
                top:
                    triggerRect.top +
                    scrollTop +
                    (triggerRect.height - popoverRect.height) / 2,
                left: triggerRect.right + scrollLeft + offset,
            };
        case "left":
            return {
                top:
                    triggerRect.top +
                    scrollTop +
                    (triggerRect.height - popoverRect.height) / 2,
                left:
                    triggerRect.left + scrollLeft - popoverRect.width - offset,
            };
        default:
            return { top: 0, left: 0 };
    }
};

export const resolvePopoverSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    return {
        fontSize: resolvedSize,
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
            background: isValidGradient(colors.surface)
                ? alpha(colors.surface, 0.2)
                : dynamicElevation(colors.surface, elevation),
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
