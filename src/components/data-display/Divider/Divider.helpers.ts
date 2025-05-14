import type { Theme } from "@emotion/react";
import { formatHex8, parse } from "culori";
import type { Color, ColorLike } from "../../../types";
import { isThemeColor } from "../../../utils/isThemeColor";

export const resolveDividerColor = (
    { colors }: Theme,
    color: Color | ColorLike,
) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = parse(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    return formatHex8(parsedColor);
};

export const resolveDividerVariant = (
    isVertical: boolean,
    lineColor: string,
) => {
    return {
        dashed: {
            ...(isVertical ? { width: "1px" } : { height: "1px" }),
            backgroundImage: `repeating-linear-gradient(to right,${lineColor},${lineColor} 4px,transparent 4px,transparent 8px)`,
        },
        dotted: {
            ...(isVertical ? { width: "1px" } : { height: "1px" }),
            backgroundImage: `repeating-linear-gradient(to right,${lineColor},${lineColor} 1px,transparent 1px,transparent 4px)`,
        },
        double: {
            ...(isVertical ? { width: "1px" } : { height: "0" }),
            borderLeft: `3px double ${lineColor}`,
            background: "none",
            boxSizing: "content-box" as const,
        },
        solid: {
            ...(isVertical ? { width: "1px" } : { height: "1px" }),
            backgroundColor: lineColor,
        },
    };
};
