import styled from "@emotion/styled";
import { formatHex8, parse } from "culori";
import { alpha, isThemeColor, readableTextColor } from "utils";

import { Color, ColorLike, Theme } from "../../../types";
import { TypographyProps } from "./Typography.types";

const variantStyles = ({ colors }: Theme, color: Color | ColorLike) => {
    const isCustomColor = !isThemeColor(color);
    const resolvedColor = isCustomColor ? color : colors[color];

    const parsedColor = parse(resolvedColor);
    if (!parsedColor) throw new Error("Invalid color");

    const typographyPrimary = colors.common.white;
    if (!typographyPrimary) throw new Error("Invalid color");

    const textColorDefault = readableTextColor(
        resolvedColor,
        colors.common.white,
        2.5,
    );

    return {
        solid: {
            backgroundColor: formatHex8(parsedColor),
            color: textColorDefault,
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
        none: {
            backgroundColor: "transparent",
            color: textColorDefault,
            border: "none",
        },
    };
};

export const Typography = styled.span<TypographyProps>(
    ({ theme, level = "body-md", color = "#fff", variant = "none" }) => ({
        ...variantStyles(theme, color)[variant],
        ...theme.typography.levels[level],
        padding: 4,
    }),
);
