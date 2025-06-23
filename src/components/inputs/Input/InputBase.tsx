import type { Size } from "../../../types";
import styled from "../../../utils/styled";
import { resolveInputSize, resolveInputStyles } from "./Input.helpers";
import type { InputBaseProps } from "./Input.types";

export const InputRoot = styled("div")<{ fullWidth: boolean }>(
    ({ fullWidth }) => ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: fullWidth ? "100%" : "auto",
    }),
);

export const InputBase = styled("input")<InputBaseProps>(
    ({
        theme,
        color = "neutral",
        size,
        variant = "outlined",
        fullWidth,
        disabled,
    }) => ({
        ...resolveInputSize(size as Size | number),
        ...resolveInputStyles(theme, color)[variant],
        ...(fullWidth && { width: "100%" }),
        ...(disabled && {
            opacity: 0.5,
        }),

        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }),
);

export const DecoratorWrapper = styled("div")<{
    position: "start" | "end";
    size: Size | number;
}>(({ position, size }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: position === "start" ? "0.25em" : undefined,
    right: position === "end" ? "0.25em" : undefined,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: size === "sm" ? "1.5em" : size === "md" ? "2em" : "2.5em",
}));
