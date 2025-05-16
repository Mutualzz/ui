import { useTheme } from "../../../hooks/useTheme";
import { isThemeColor } from "../../../utils/isThemeColor";

import { formatHex8 } from "culori";
import { useEffect, useRef, useState, type FC } from "react";
import type { Variant } from "../../../types";
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

const clamp = (n: number, min: number, max: number) =>
    n < min ? min : n > max ? max : n;

const ProgressWrapper = styled("div")<{
    width: number | string;
    height: number | string;
    background: string;
    outlinedColor: string;
    variant: Variant;
}>(({ width, height, background, outlinedColor, variant }) => ({
    position: "relative",
    width,
    height,
    background,
    borderRadius: "0.5rem",
    overflow: "hidden",
    ...(variant === "outlined" && { border: `1px solid ${outlinedColor}` }),
}));

const BarContainer = styled("div")<{ innerHeight: number | string }>(
    ({ innerHeight }) => ({
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: innerHeight,
        transform: "translateY(-50%)",
        overflow: "hidden",
        borderRadius: "inherit",
    }),
);

const DeterminateBar = styled("div")<{ barColor: string; value: number }>(
    ({ barColor, value }) => ({
        height: "100%",
        background: barColor,
        width: `${Math.min(Math.max(value, 0), 100)}%`,
        transition: "width 0.3s ease",
    }),
);

const IndeterminateBar = styled("div")<{
    barColor: string;
    animation: LinearProgressAnimation;
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
    children,
    ...props
}) => {
    const { theme } = useTheme();

    const rawW = resolveLength(length);
    const rawH = resolveThickness(thickness);
    const baseW = typeof rawW === "number" ? rawW : parseFloat(rawW);
    const baseH = typeof rawH === "number" ? rawH : parseFloat(rawH);

    const background = variantColors(theme, color)[variant];
    const barColor = isThemeColor(color)
        ? formatHex8(theme.colors[color])!
        : formatHex8(color)!;
    const outlinedColor = isThemeColor(color)
        ? formatHex8(theme.colors[color])!
        : formatHex8(color)!;

    const measurer = useRef<HTMLDivElement>(null);
    const [{ width: cw, height: ch }, setContent] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        if (!measurer.current) return;
        const ro = new ResizeObserver(([e]) =>
            setContent({
                width: e.contentRect.width,
                height: e.contentRect.height,
            }),
        );
        ro.observe(measurer.current);
        return () => ro.disconnect();
    }, [children]);

    const padding = 4;
    const maxFactor = 3;
    const neededW = cw + padding * 2;
    const neededH = ch + padding * 2;
    const wrapperW = children
        ? clamp(neededW, baseW, baseW * maxFactor)
        : baseW;
    const wrapperH = children
        ? clamp(neededH, baseH, baseH * maxFactor)
        : baseH;

    const widthCSS = children ? wrapperW : rawW;
    const heightCSS = children ? wrapperH : rawH;

    return (
        <ProgressWrapper
            width={widthCSS}
            height={heightCSS}
            background={background}
            outlinedColor={outlinedColor}
            variant={variant}
            {...props}
        >
            <BarContainer innerHeight={rawH}>
                {determinate ? (
                    <DeterminateBar barColor={barColor} value={value} />
                ) : (
                    <IndeterminateBar
                        barColor={barColor}
                        animation={animation}
                    />
                )}
            </BarContainer>

            {children && (
                <>
                    <div
                        ref={measurer}
                        css={{
                            position: "absolute",
                            visibility: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        {children}
                    </div>

                    <div
                        css={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            width: "100%",
                            height: rawH,
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: `${padding}px`,
                            pointerEvents: "none",
                        }}
                    >
                        {children}
                    </div>
                </>
            )}
        </ProgressWrapper>
    );
};
