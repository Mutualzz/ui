import { formatHex8, parse, rgb } from "culori";
import { Color, ColorLike, Theme } from "../../../types";
import {
    alpha,
    dynamicElevation,
    isThemeColor,
    readableTextColor,
} from "../../../utils";
import { PaperElevation } from "./Paper.types";

export const variantStyles = (
    { colors }: Theme,
    color: Color | ColorLike,
    elevation: PaperElevation,
) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = parse(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const typographyPrimary = rgb(colors.common.white);
    if (!typographyPrimary) throw new Error("Invalid color");

    const textColorDefault = readableTextColor(
        resolvedColor,
        colors.common.white,
        2.5,
    );

    return {
        elevation: {
            backgroundColor: dynamicElevation(colors.surface, elevation),
            boxShadow: `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`,
        },
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: textColorDefault,
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
