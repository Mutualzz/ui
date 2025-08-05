import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size, SizeValue } from "@ui-types";

import { alpha } from "@utils";
import { resolveColor } from "@utils/resolveColor";
import { resolveSize } from "@utils/resolveSize";
import { formatHex8 } from "culori";

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

export const resolveLinearProgressThickness = (
    theme: Theme,
    thickness: Size | SizeValue | number,
) => resolveSize(theme, thickness, thicknessMap);

export const resolveLinearProgressLength = (
    theme: Theme,
    length: Size | SizeValue | number,
) => resolveSize(theme, length, lengthMap);
