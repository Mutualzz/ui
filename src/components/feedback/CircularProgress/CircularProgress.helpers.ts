import { formatHex8, parse } from "culori";
import type { Color, ColorLike, Size, Theme } from "../../../types";
import { isThemeColor } from "../../../utils/isThemeColor";

const minSize = 16,
    maxSize = 64;

const minSizeThickness = 2,
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

    const solid = { ...parsedColor, alpha: 0.4 };
    const soft = { ...parsedColor, alpha: 0.2 };

    return {
        plain: "transparent",
        solid: formatHex8(solid),
        soft: formatHex8(soft),
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
    if (typeof size === "string") base = sizes[size];

    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = sizes.md;
    if (base < minSize) base = minSize;
    if (base > maxSize) base = maxSize;

    return base;
};

export const resolveCiruclarProgressThickness = (thickness: Size | number) => {
    let base = thickness;
    if (typeof thickness === "string") base = thicknesses[thickness];

    if (typeof base === "string") base = parseFloat(base);
    if (isNaN(base)) base = thicknesses.md;
    if (base < minSizeThickness) base = minSizeThickness;
    if (base > maxSizeThickness) base = maxSizeThickness;

    return base;
};
