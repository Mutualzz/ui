import type { Theme } from "@emotion/react";
import { formatHex8, rgb } from "culori";
import { type Color, type ColorLike } from "../../../types";
import {
    adjustTextColor,
    alpha,
    getLuminance,
    isThemeColor,
} from "../../../utils";

export const variantStyles = ({ colors }: Theme, color: Color | ColorLike) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = rgb(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = rgb(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
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
