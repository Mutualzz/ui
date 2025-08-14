import type { Theme } from "@emotion/react";
import type { Color, ColorLike } from "@ui-types";
import { darken, getLuminance, resolveColor } from "@utils";
import { formatHex, formatHex8 } from "culori";

export const resolveColorPickerButtonStyles = (
    theme: Theme,
    color: Color | ColorLike,
) => {
    const { colors } = theme;

    const resolvedColor = resolveColor(color, theme);
    const bgLuminance = getLuminance(resolvedColor);

    const luminatedColor =
        formatHex8(
            bgLuminance < 0.5 ? colors.common.white : colors.common.black,
        ) ?? theme.typography.colors.primary;

    const hexColor = formatHex8(resolvedColor);

    return {
        solid: {
            backgroundColor: hexColor,
            border: `2px solid ${luminatedColor}`,
        },
        plain: {
            backgroundColor: hexColor,
            border: "none",
        },
        outlined: {
            backgroundColor: hexColor,
            border: `2px solid ${formatHex(darken(resolvedColor, 0.3))}`,
        },
        soft: {
            backgroundColor: hexColor,
            border: `2px solid ${luminatedColor}`,
        },
    };
};
