import styled from "@styled";

import {
    resolveInputRootSize,
    resolveInputRootStyles,
} from "./InputRoot.helpers";
import type { InputRootProps } from "./InputRoot.types";

const InputRoot = styled("div")<InputRootProps>(
    ({
        theme,
        color = "neutral",
        textColor = "inherit",
        size = "md",
        variant = "outlined",
        error = false,
        fullWidth,
        disabled,
    }) => ({
        ...resolveInputRootSize(theme, size),
        ...resolveInputRootStyles(theme, color, textColor, error)[variant],
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
        transition: "all 0.3s ease",
    }),
);

InputRoot.displayName = "InputRoot";

export { InputRoot };
