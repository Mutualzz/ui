import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size } from "@ui-types";
import { alpha } from "@utils/alpha";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const minSize = 16,
    maxSize = 64;

const minSizeThickness = 1,
    maxSizeThickness = 10;

export const resolveCircularProgressStyles = (
    theme: Theme,
    color: Color | ColorLike,
) => {
    const resolvedColor = resolveColor(color, theme);

    return {
        plain: "transparent",
        solid: formatHex8(alpha(resolvedColor, 0.5))!,
        soft: formatHex8(alpha(resolvedColor, 0.1))!,
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

export const resolveCircularProgressSize = (size: Size | number) =>
    resolveSize(size, minSize, maxSize, sizes);

export const resolveCircularProgressThickness = (thickness: Size | number) => {
    const sizeVal = resolveSize(
        thickness,
        minSizeThickness,
        maxSizeThickness,
        thicknesses,
    );

    return Object.values(thicknesses).includes(sizeVal) ? sizeVal : sizeVal / 2;
};
