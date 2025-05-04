import styled from "@emotion/styled";
import { formatHex8, parse } from "culori";
import { alpha, isThemeColor, readableTextColor } from "utils";
import { Theme } from "../../../../dist/types";
import {
    TypographyColor,
    TypographyLevel,
    TypographyProps,
} from "./Typography.types";

const levelSizeMap: Record<TypographyLevel, number> = {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    "title-lg": 20,
    "title-md": 18,
    "title-sm": 16,
    "body-lg": 16,
    "body-md": 14,
    "body-sm": 12,
};

const variantStyles = (
    { colors }: Theme,
    color: TypographyColor,
    level: TypographyLevel,
) => {
    const isCustomColor = !isThemeColor(color);
    let resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = parse(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const typographyPrimary = colors.typography.primary;
    if (!typographyPrimary) throw new Error("Invalid color");

    const textColor = readableTextColor(
        resolvedColor,
        colors.common.white,
        2.5,
    );

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: textColor,
            border: "none",
        },
        outlined: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: `1px solid ${formatHex8(parsedColor)}`,
        },
        plain: {
            backgroundColor: "transparent",
            color: formatHex8(parsedColor),
            border: "none",
        },
        soft: {
            backgroundColor: alpha(parsedColor, 0.4),
            color: formatHex8(parsedColor),
            border: "none",
        },
    };
};

export const Typography = styled.span<TypographyProps>(
    ({ theme, level = "body-md", color = "#fff", variant = "plain" }) => ({
        ...variantStyles(theme, color, level)[variant],
        fontSize: levelSizeMap[level],
        lineHeight: 1.5,
        padding: 4,
    }),
);
