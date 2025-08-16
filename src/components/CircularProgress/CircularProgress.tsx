import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

import styled from "@styled";
import type { Color, ColorLike, Size, Variant } from "@ui-types";
import { resolveSize } from "@utils";
import { resolveColor } from "@utils/resolveColor";
import debounce from "lodash-es/debounce";
import {
    resolveCircularProgressOuterStroke,
    resolveCircularProgressSize,
} from "./CircularProgress.helpers";
import { spin } from "./CircularProgress.keyframes";
import type { CircularProgressProps } from "./CircularProgress.types";

const CircularProgressWrapper = styled("div")<{
    diameter: number;
    strokeWidth: number;
    color: Color | ColorLike;
    variant: Variant;
}>(({ theme, color, diameter, strokeWidth, variant }) => ({
    position: "relative" as const,
    display: "inline-flex",
    width: diameter,
    height: diameter,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    transition: "all 0.3s ease",

    ...(variant === "outlined" &&
        diameter > 0 && {
            "::before": {
                content: '""',
                position: "absolute",
                top: strokeWidth / 2,
                left: strokeWidth / 2,
                right: strokeWidth / 2,
                bottom: strokeWidth / 2,
                borderRadius: "50%",
                border: `1px solid ${resolveColor(color, theme)}`,
                boxSizing: "border-box",
            },
            "::after": {
                content: '""',
                position: "absolute",
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                borderRadius: "50%",
                border: `1px solid ${resolveColor(color, theme)}`,
                boxSizing: "border-box",
            },
        }),
}));

const CircularProgressContent = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: 8,
    transition: "all 0.3s ease",
});

const CircularProgressSvg = styled("svg")<{
    diameter: number;
    determinate: boolean;
}>(({ diameter, determinate }) => ({
    position: "absolute",
    width: diameter,
    height: diameter,
    top: 0,
    left: 0,
    transition: "all 0.3s ease",
    ...(!determinate && {
        animation: `${spin} 1s linear infinite`,
    }),
}));

const CircularProgressCircleOuter = styled("circle")<{
    color: Color | ColorLike;
    variant: Variant;
    strokeWidth: number;
}>(({ theme, color, strokeWidth, variant }) => ({
    stroke: resolveCircularProgressOuterStroke(theme, color)[variant],
    fill: "none",
    strokeWidth,
}));

const CircularProgressCircleInner = styled("circle")<{
    color: Color | ColorLike;
    strokeWidth: number;
    determinate: boolean;
    circumference: number;
    dashOffset: number;
}>(({ theme, circumference, determinate, dashOffset, color, strokeWidth }) => ({
    transform: "rotate(-90deg)",
    transformOrigin: "center",
    fill: "none",
    strokeLinecap: "round",
    transition:
        "stroke-dasharray 0.3s ease, stroke-dashoffset 0.3s ease, transform 0.3s ease",

    stroke: resolveColor(color, theme),
    strokeWidth,
    strokeDashoffset: determinate ? dashOffset : 0,
    strokeDasharray: determinate
        ? circumference
        : `${circumference * 0.25} ${circumference}`,
}));

const strokeWidthSizeMap: Record<Size, number> = {
    sm: 2,
    md: 4,
    lg: 6,
};

/**
 * CircularProgress component that renders a circular progress indicator.
 * It supports both determinate and indeterminate states, with customizable size, variant, and color.
 * The component can display children content inside the circular progress.
 * It uses SVG for rendering the progress circle and applies styles based on the provided props.
 */
const CircularProgress = ({
    size = "md",
    variant = "soft",
    color = "primary",
    determinate = false,
    strokeWidth: strokeWidthProp,
    value = 0,
    children,
    ...props
}: CircularProgressProps) => {
    const { theme } = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentDiameter, setContentDiameter] = useState(0);

    useEffect(() => {
        if (!contentRef.current) return;
        const handleResize = debounce((entry: ResizeObserverEntry) => {
            const { width, height } = entry.contentRect;
            setContentDiameter(Math.max(width, height));
        }, 100); // 100ms debounce

        const ro = new ResizeObserver((entries) => {
            if (entries[0]) handleResize(entries[0]);
        });
        ro.observe(contentRef.current);
        return () => {
            ro.disconnect();
            handleResize.cancel();
        };
    }, []);

    const baseDiameter = resolveCircularProgressSize(theme, size);
    const strokeWidth = strokeWidthProp
        ? resolveSize(theme, strokeWidthProp, strokeWidthSizeMap)
        : Math.max(2, baseDiameter * 0.1);

    const diameter = contentDiameter
        ? contentDiameter + strokeWidth + 8 * 2
        : baseDiameter;

    const radius = (diameter - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = ((100 - value) / 100) * circumference;

    return (
        <CircularProgressWrapper
            diameter={diameter}
            strokeWidth={strokeWidth}
            variant={variant}
            color={color}
        >
            <CircularProgressContent ref={contentRef}>
                {children}
            </CircularProgressContent>

            {diameter > 0 && (
                <CircularProgressSvg
                    {...props}
                    role="progressbar"
                    diameter={diameter}
                    determinate={determinate}
                    viewBox={`0 0 ${diameter} ${diameter}`}
                >
                    <CircularProgressCircleOuter
                        variant={variant}
                        color={color}
                        strokeWidth={strokeWidth}
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                    />
                    <CircularProgressCircleInner
                        color={color}
                        strokeWidth={strokeWidth}
                        determinate={determinate}
                        circumference={circumference}
                        dashOffset={dashOffset}
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                    />
                </CircularProgressSvg>
            )}
        </CircularProgressWrapper>
    );
};

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };
