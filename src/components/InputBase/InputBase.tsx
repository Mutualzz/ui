import styled from "@styled";
import {
    resolveInputBaseSize,
    resolveInputBaseStyles,
} from "./InputBase.helpers";
import type { InputBaseProps } from "./InputBase.types";

const InputRoot = styled("div")<InputBaseProps>(
    ({
        theme,
        color = "neutral",
        textColor = "inherit",
        size = "md",
        variant = "outlined",
        fullWidth,
        disabled,
    }) => ({
        ...resolveInputBaseSize(size),
        ...resolveInputBaseStyles(theme, color, textColor)[variant],
        ...(disabled && { opacity: 0.5 }),

        display: "flex",
        alignItems: "center",

        width: fullWidth ? "100%" : "auto",
        maxWidth: "100%",
        minWidth: 0,
        flexShrink: 1,
        flexGrow: fullWidth ? 1 : 0,
        boxSizing: "border-box",
        overflow: "hidden",

        paddingInline: "0.5em",
        gap: "0.375em",
        borderRadius: 8,
    }),
);

InputRoot.displayName = "InputRoot";

const InputBase = styled("input")({
    flex: 1,
    minWidth: 0,
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    padding: 0,

    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
    },
    "&[type='number']": {
        MozAppearance: "textfield",
    },
});

InputBase.displayName = "InputBase";

export { InputBase, InputRoot };
