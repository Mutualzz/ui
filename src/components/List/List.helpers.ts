import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Variant } from "@ui-types";
import { alpha, getLuminance, resolveColor } from "@utils";
import { formatHex8, parse } from "culori";

export const resolveListStyles = (
    theme: Theme,
    color: Color | ColorLike,
): Record<Variant, CSSObject> => {
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = parse(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            border: "none",
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
        },
    };
};
