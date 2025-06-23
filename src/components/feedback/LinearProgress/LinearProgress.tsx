import { useTheme } from "../../../hooks/useTheme";

import { type FC } from "react";
import type { Variant } from "../../../types";
import { resolveColor } from "../../../utils/resolveColor";
import styled from "../../../utils/styled";
import {
    resolveLength,
    resolveThickness,
    variantColors,
} from "./LinearProgress.helpers";
import { bounce, scaleInOut, slide, wave } from "./LinearProgress.keyframes";
import type { LinearProgressProps } from "./LinearProgress.types";

const ProgressWrapper = styled("div")<{
    width: string | number;
    background: string;
    outlinedColor: string;
    variant: Variant;
}>(({ width, background, outlinedColor, variant }) => ({
    position: "relative",
    width,
    background,
    borderRadius: "0.5rem",
    overflow: "hidden",
    ...(variant === "outlined" && { border: `1px solid ${outlinedColor}` }),
}));

const DeterminateBar = styled("div")<{
    barColor: string;
    value: number;
}>(({ barColor, value }) => ({
    width: `${Math.min(Math.max(value, 0), 100)}%`,
    height: "100%",
    background: barColor,
    transition: "width 0.3s ease",
}));

const IndeterminateBar = styled("div")<{
    barColor: string;
    animation: LinearProgressProps["animation"];
}>(({ barColor, animation }) => {
    const base: Record<string, any> = {
        height: "100%",
        background: barColor,
        position: "absolute",
    };

    switch (animation) {
        case "bounce":
            return {
                ...base,
                width: "30%",
                animation: `${bounce} 1.5s infinite ease-in-out`,
            };
        case "slide":
            return {
                ...base,
                width: "40%",
                animation: `${slide} 1.5s infinite ease-in-out`,
            };
        case "wave":
            return {
                ...base,
                width: "100%",
                animation: `${wave} 1.5s infinite ease-in-out`,
            };
        case "scale-in-out":
            return {
                ...base,
                width: "100%",
                animation: `${scaleInOut} 1.5s infinite ease-in-out`,
            };
    }
});

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

    const sharedColor = resolveColor(color, theme);

    return (
        <ProgressWrapper
            width={width}
            height={height}
            background={background}
            outlinedColor={sharedColor}
            variant={variant}
        >
            {determinate ? (
                <DeterminateBar barColor={sharedColor} value={value} />
            ) : (
                <IndeterminateBar
                    barColor={sharedColor}
                    animation={animation}
                />
            )}
        </ProgressWrapper>
    );
};
