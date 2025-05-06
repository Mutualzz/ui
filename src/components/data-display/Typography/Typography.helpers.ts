import { formatHex8, rgb } from "culori";
import { Color, ColorLike, Theme } from "../../../types";
import { alpha, isThemeColor } from "../../../utils";
import { adjustTextColor } from "../../../utils/adjustTextColor";

export const variantStyles = (
    { colors, typography, ...theme }: Theme,
    color: Color | ColorLike,
) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const textColor = rgb(typography.colors.primary);
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        plain: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: "none",
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            color: formatHex8(parsedColor),
            border: "none",
        },
        none: {
            backgroundColor: "transparent",
            color: formatHex8(textColor),
            border: "none",
        },
    };
};
