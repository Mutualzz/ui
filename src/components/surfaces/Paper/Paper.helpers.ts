import { formatHex8, rgb } from "culori";
import { getLuminance } from "utils/getLuminance";
import { Color, ColorLike, Theme } from "../../../types";
import {
    adjustTextColor,
    alpha,
    dynamicElevation,
    isThemeColor,
} from "../../../utils";
import { PaperElevation } from "./Paper.types";

export const variantStyles = (
    { colors, typography, ...theme }: Theme,
    color: Color | ColorLike,
    elevation: PaperElevation,
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
