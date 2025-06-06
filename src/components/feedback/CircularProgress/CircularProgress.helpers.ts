import type { Theme } from "@emotion/react";
import { formatHex8, parse } from "culori";
import type { Color, ColorLike, Size } from "../../../types";
import { alpha } from "../../../utils/alpha";
import { isThemeColor } from "../../../utils/isThemeColor";

const minSize = 16,
    maxSize = 64;

const minSizeThickness = 1,
    maxSizeThickness = 10;

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

    return {
        plain: "transparent",
        solid: formatHex8(alpha(parsedColor, 0.5))!,
        soft: formatHex8(alpha(parsedColor, 0.1))!,
        outlined: "transparent",
    };
};

export const sizes: Record<Size, number> = {
    sm: 24,
    md: 36,
    lg: 48,
};

export const thicknesses: Record<Size, number> = {
    sm: 4,
    md: 6,
    lg: 8,
};

export const resolveCircularProgressSizes = (size: Size | number) => {
    let base = size;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = sizes[size as Size];

    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;

    return base;
};

export const resolveCiruclarProgressThickness = (thickness: Size | number) => {
    let base = thickness;
    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thicknesses[thickness as Size];

    if (base < minSizeThickness) base = minSizeThickness;
    if (base > maxSizeThickness) base = maxSizeThickness;

    return Object.values(thicknesses).includes(base) ? base : base / 2;
};
