import type { Theme } from "@emotion/react";
import type { Size } from "@ui-types";
import { resolveSize } from "@utils";

const minSize = 24,
    maxSize = 72;

const baseSizeMap: Record<Size, number> = {
    sm: 30,
    md: 46,
    lg: 64,
};

export const resolveListItemButtonSize = (
    theme: Theme,
    size: Size | number,
) => {
    const sizeVal = resolveSize(size, minSize, maxSize, baseSizeMap);

    let gap, minHeight, paddingY, paddingX, fontSize;
    switch (size) {
        case "sm":
            gap = "0.5rem";
            minHeight = "2rem";
            paddingY = 3;
            paddingX = 3;
            fontSize = theme.typography.levels["body-sm"].fontSize;
            break;
        case "md":
            gap = "0.625rem";
            minHeight = "2.25rem";
            paddingY = "0.25rem";
            paddingX = "0.25rem";
            fontSize = theme.typography.levels["body-md"].fontSize;
            break;
        case "lg":
            gap = "0.75rem";
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

export { resolveButtonStyles as resolveListItemButtonStyles } from "../Button/Button.helpers";
