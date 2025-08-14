import type { Theme } from "@emotion/react";
import type { Color, ColorLike, Size, SizeValue } from "@ui-types";
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

export const baseSizeMap: Record<Size, number> = {
    sm: 32,
    md: 40,
    lg: 48,
};

export const resolveCircularProgressSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => resolveSize(theme, size, baseSizeMap);
