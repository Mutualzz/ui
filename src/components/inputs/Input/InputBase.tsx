import type { Size } from "../../../types";
import styled from "../../../utils/styled";
import { resolveInputSize, resolveInputStyles } from "./Input.helpers";
import type { InputBaseProps } from "./Input.types";

export const InputRoot = styled("div")<InputBaseProps>(
    ({
        theme,
        color = "neutral",
        size = "md",
        variant = "outlined",
        fullWidth,
        disabled,
    }) => ({
        ...resolveInputSize(size),
        ...resolveInputStyles(theme, color)[variant],
        ...(disabled && {
            opacity: 0.5,
        }),
        width: fullWidth ? "100%" : "auto",

        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        paddingInline: "0.5em",
        gap: "0.375em",
        minHeight: "2.25em",
        boxSizing: "border-box",
    }),
);

export const DecoratorWrapper = styled("div")<{
    size: Size | number;
}>(({ size }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2em",
    fontSize: size === "sm" ? "0.875rem" : size === "md" ? "1rem" : "1.125rem",
    width: size === "sm" ? "1.5em" : size === "md" ? "2em" : "2.5em",
    flexShrink: 0,
    color: "inherit",
}));

export const InputBase = styled("input")({
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    padding: 0,
    minWidth: 0,

    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
    },
    "&[type='number']": {
        MozAppearance: "textfield",
    },
});
