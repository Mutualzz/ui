import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Size, SizeValue, Variant } from "@ui-types";
import { alpha, resolveColor, resolveSize } from "@utils";
import { formatHex8 } from "culori";

const baseSizeMap: Record<Size, number> = {
    sm: 30,
    md: 46,
    lg: 64,
};

export const resolveListItemSize = (
    theme: Theme,
    size: Size | SizeValue | number,
) => {
    const resolvedSize = resolveSize(theme, size, baseSizeMap);

    let gap, minHeight, paddingX, fontSize;
    switch (size) {
        case "sm":
            gap = "0.25rem";
            minHeight = "2rem";
            paddingX = 3;
            fontSize = theme.typography.levels["body-sm"].fontSize;
            break;
        case "md":
            gap = "0.375rem";
            minHeight = "2.25rem";
            paddingX = "0.25rem";
            fontSize = theme.typography.levels["body-md"].fontSize;
            break;
        case "lg":
            gap = "0.5rem";
            minHeight = "2.75rem";
            paddingX = "0.5rem";
            fontSize = theme.typography.levels["body-lg"].fontSize;
            break;
        default:
            gap = resolvedSize / 10;
            minHeight = resolvedSize;
            paddingX = resolvedSize / 8;
            fontSize = resolvedSize / 2;
            break;
    }

    return {
        gap,
        minHeight,
        paddingInline: paddingX,
        fontSize,
    };
};

export const resolveListItemStyles = (
    theme: Theme,
    color: Color | ColorLike,
): Record<Variant, CSSObject> => {
    const resolvedColor = resolveColor(color, theme);

    return {
        solid: {
            backgroundColor: formatHex8(resolvedColor),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
        },
        soft: {
            backgroundColor: formatHex8(alpha(resolvedColor, 0.4)),
            border: "none",
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
        },
    };
};
