import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size, SizeValue } from "@ui-types";
import { cssUnitRegex } from "@utils";
import { alpha } from "@utils/alpha";
import { resolveColor } from "@utils/resolveColor";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

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

export const resolveCircularProgressSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => resolveSize(theme, size, sizes);

export const resolveCircularProgressThickness = (
    theme: Theme,
    thickness: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, thickness, thicknesses);
    if (cssUnitRegex.test(resolvedSize.toString())) return resolvedSize;

    return Object.values(thicknesses).includes(resolvedSize)
        ? resolvedSize
        : resolvedSize / 2;
};
