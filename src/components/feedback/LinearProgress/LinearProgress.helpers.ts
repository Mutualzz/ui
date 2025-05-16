import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size } from "../../../types";
import { isThemeColor } from "../../../utils/isThemeColor";

import { formatHex8, parse } from "culori";

const minLength = 80,
    maxLength = 240;
const minThickness = 4,
    maxThickness = 16;

export const variantColors = ({ colors }: Theme, color: Color | ColorLike) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = parse(resolvedColor);
    if (!parsedColor)
        return {
            plain: "transparent",
            solid: "transparent",
            soft: "transparent",
            outlined: "transparent",
        };

    const solid = { ...parsedColor, alpha: 0.6 };
    const soft = { ...parsedColor, alpha: 0.1 };

    return {
        plain: "transparent",
        solid: formatHex8(solid),
        soft: formatHex8(soft),
        outlined: "transparent",
    };
};

export const thicknessMap: Record<Size, number> = {
    sm: 4,
    md: 6,
    lg: 8,
};

export const lengthMap: Record<Size, number> = {
    sm: 120,
    md: 160,
    lg: 200,
};

export const resolveThickness = (thickness: Size | number) => {
    let base = thickness;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thicknessMap[thickness as Size];

    if (base < minThickness) base = minThickness;
    if (base > maxThickness) base = maxThickness;

    return base;
};

export const resolveLength = (length: Size | number) => {
    let base = length;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = lengthMap[length as Size];

    if (base < minLength) base = minLength;
    if (base > maxLength) base = maxLength;

    return base;
};
