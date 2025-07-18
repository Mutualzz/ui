import type { CSSObject, Theme } from "@emotion/react";
import type { Color, ColorLike, Size, Variant } from "@ui-types";
import { alpha, getLuminance, resolveColor, resolveSize } from "@utils";
import { formatHex8, parse } from "culori";

const minSize = 24,
    maxSize = 72;

const baseSizeMap: Record<Size, number> = {
    sm: 30,
    md: 46,
    lg: 64,
};

export const resolveListSize = (theme: Theme, size: Size | number) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    let gap, minHeight, paddingY, paddingX, fontSize;
    switch (size) {
        case "sm":
            gap = "0.25rem";
            minHeight = "2rem";
            paddingY = 3;
            paddingX = 3;
            fontSize = theme.typography.levels["body-sm"].fontSize;
            break;
        case "md":
            gap = "0.375rem";
            minHeight = "2.25rem";
            paddingY = "0.25rem";
            paddingX = "0.25rem";
            fontSize = theme.typography.levels["body-md"].fontSize;
            break;
        case "lg":
            gap = "0.5rem";
            minHeight = "2.75rem";
            paddingY = "0.375rem";
            paddingX = "0.5rem";
            fontSize = theme.typography.levels["body-lg"].fontSize;
            break;
        default:
            gap = sizeVal / 10;
            minHeight = sizeVal;
            paddingY = sizeVal / 8;
            paddingX = sizeVal / 8;
            fontSize = sizeVal / 2;
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
    const { colors } = theme;

    const parsedColor = parse(resolveColor(color, theme));
    if (!parsedColor) throw new Error("Invalid color");

    const bgLuminance = getLuminance(parsedColor);
    const textColor = parse(
        bgLuminance < 0.5 ? colors.common.white : colors.common.black,
    );
    if (!textColor) throw new Error("Invalid color");

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            border: "none",
        },
        plain: {
            backgroundColor: "transparent",
            border: "none",
        },
    };
};
