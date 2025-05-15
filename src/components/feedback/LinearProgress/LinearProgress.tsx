import { useTheme } from "../../../hooks/useTheme";
import { isThemeColor } from "../../../utils/isThemeColor";

import { css } from "@emotion/react";
import { formatHex8 } from "culori";
import type { FC } from "react";
import styled from "../../../utils/styled";
import {
    resolveLength,
    resolveThickness,
    variantColors,
} from "./LinearProgress.helpers";
import { bounce, scaleInOut, slide, wave } from "./LinearProgress.keyframes";
import type {
    LinearProgressAnimation,
    LinearProgressProps,
} from "./LinearProgress.types";

const ProgressWrapper = styled("div")<{
    width: string | number;
    height: string | number;
    background: string;
    outlinedColor: string;
    variant: LinearProgressProps["variant"];
}>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background: ${({ background }) => background};
    border-radius: 0.5rem;
    overflow: hidden;
    ${({ variant, outlinedColor }) =>
        variant === "outlined" && `border: 1px solid ${outlinedColor};`}
`;

const DeterminateBar = styled("div")<{
    barColor: string;
    value: number;
}>`
    height: 100%;
    background: ${({ barColor }) => barColor};
    border-radius: inherit;
    width: ${({ value }) => Math.min(Math.max(value, 0), 100)}%;
    transition: width 0.3s ease;
`;

const IndeterminateBar = styled("div")<{
    barColor: string;
    animation: LinearProgressAnimation;
}>`
    height: 100%;
    background: ${({ barColor }) => barColor};
    border-radius: inherit;

    ${({ animation }) =>
        animation === "slide" &&
        css`
            position: absolute;
            width: 50%;
            animation: ${slide} 1.5s infinite ease-in-out;
        `}

    ${({ animation }) =>
        animation === "wave" &&
        css`
            width: 100%;
            animation: ${wave} 1.5s infinite ease-in-out;
        `}

  ${({ animation, barColor }) =>
        animation === "bounce" &&
        css`
            position: absolute;
            height: 100%;
            width: 30%;
            background: ${barColor};
            border-radius: inherit;
            animation: ${bounce} 1.5s infinite ease-in-out;
        `}

  ${({ animation }) =>
        animation === "scale-in-out" &&
        css`
            width: 100%;
            animation: ${scaleInOut} 1.5s infinite ease-in-out;
        `}
`;

export const LinearProgress: FC<LinearProgressProps> = ({
    thickness = "md",
    length = "md",
    variant = "soft",
    color = "primary",
    animation = "bounce",
    determinate = false,
    value = 0,
}) => {
    const { theme } = useTheme();

    const height = resolveThickness(thickness);
    const width = resolveLength(length);
    const background = variantColors(theme, color)[variant];

    const barColor = isThemeColor(color)
        ? formatHex8(theme.colors[color])!
        : formatHex8(color)!;

    const outlinedColor = isThemeColor(color)
        ? formatHex8(theme.colors[color])!
        : formatHex8(color)!;

    return (
        <ProgressWrapper
            width={width}
            height={height}
            background={background}
            outlinedColor={outlinedColor}
            variant={variant}
        >
            {determinate ? (
                <DeterminateBar barColor={barColor} value={value} />
            ) : (
                <IndeterminateBar barColor={barColor} animation={animation} />
            )}
        </ProgressWrapper>
    );
};
