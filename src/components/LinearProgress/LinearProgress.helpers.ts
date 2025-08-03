import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size } from "@ui-types";

import { alpha } from "@utils";
import { resolveColor } from "@utils/resolveColors";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

const minLength = 80,
    maxLength = 240;
const minThickness = 4,
    maxThickness = 16;

export const resolveLinearProgressStyles = (
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

export const resolveLinearProgressThickness = (thickness: Size | number) =>
    resolveSize(thickness, minThickness, maxThickness, thicknessMap);

export const resolveLinearProgressLength = (length: Size | number) =>
    resolveSize(length, minLength, maxLength, lengthMap);
