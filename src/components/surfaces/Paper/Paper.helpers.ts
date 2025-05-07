import type { Theme } from "@emotion/react";
import { formatHex8, rgb } from "culori";
import { type Color, type ColorLike } from "../../../types";
import {
    adjustTextColor,
    alpha,
    dynamicElevation,
    getLuminance,
    isThemeColor,
} from "../../../utils";

export const variantStyles = (
    { colors }: Theme,
    color: Color | ColorLike,
    elevation: number,
) => {
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
        elevation: {
            backgroundColor: dynamicElevation(colors.surface, elevation),
            boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
        },
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: formatHex8(adjustTextColor(parsedColor, textColor)),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            border: `1px solid ${formatHex8(parsedColor)}`,
            color: formatHex8(parsedColor),
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
            color: formatHex8(parsedColor),
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.1),
            border: "none",
            color: formatHex8(parsedColor),
        },
    };
};
