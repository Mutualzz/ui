import type { InputProps } from "@components/Input/Input.types";
import styled from "@styled";
import {
    resolveInputBaseSize,
    resolveInputBaseStyles,
} from "./InputRoot.helpers";

const InputRoot = styled("div")<InputProps>(
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

export { InputRoot };
