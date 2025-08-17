import { type CSSObject, type Theme } from "@emotion/react";

import { formatHex8 } from "culori";

import type { Color, ColorLike, Variant } from "@ui-types";
import { alpha, getLuminance } from "@utils";
import { resolveColor } from "@utils/resolveColor";

export const resolveButtonStyles = (
    theme: Theme,
    color: Color | ColorLike,
): Record<Variant, CSSObject> => {
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
                backgroundColor: formatHex8(alpha(resolvedColor, 0.8)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.7)),
            },
            "&:disabled": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.5)),
                color: formatHex8(alpha(textColor, 0.6)),
            },
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(resolvedColor)}`,
            color: formatHex8(resolvedColor),
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.2)),
                borderColor: formatHex8(resolvedColor),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
            "&:disabled": {
                color: formatHex8(alpha(resolvedColor, 0.5)),
                borderColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: formatHex8(resolvedColor),
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.2)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
            "&:disabled": {
                color: formatHex8(alpha(resolvedColor, 0.5)),
            },
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.15)),
            color: formatHex8(resolvedColor),
            border: "none",
            "&:hover": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.3)),
            },
            "&:active": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.4)),
            },
            "&:disabled": {
                backgroundColor: formatHex8(alpha(resolvedColor, 0.05)),
                color: formatHex8(alpha(resolvedColor, 0.5)),
            },
        },
    };
};
