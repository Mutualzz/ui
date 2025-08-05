import type { Theme } from "@emotion/react";
import { type Color, type ColorLike } from "@ui-types";
import { alpha, getLuminance } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { formatHex8 } from "culori";

export const resolveTypographStyles = (
    theme: Theme,
    color: Color | ColorLike,
) => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);

    const bgLuminance = getLuminance(resolvedColor);
    const textColor =
        formatHex8(
            bgLuminance < 0.5 ? colors.common.white : colors.common.black,
        ) ?? theme.typography.colors.primary;

    return {
        solid: {
            backgroundColor: formatHex8(resolvedColor),
            color: formatHex8(textColor),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            color: formatHex8(resolvedColor),
            border: `1px solid ${formatHex8(resolvedColor)}`,
        },
        plain: {
            backgroundColor: "transparent",
            color: formatHex8(resolvedColor),
            border: "none",
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.4)),
            color: formatHex8(resolvedColor),
            border: "none",
        },
        none: {
            backgroundColor: "transparent",
            border: "none",
        },
    };
};
