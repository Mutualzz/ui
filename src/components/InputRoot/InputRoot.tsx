import styled from "@styled";

import { resolveResponsiveMerge } from "@utils/responsive";
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
        ...resolveResponsiveMerge(
            theme,
            { color, textColor, size, variant },
            ({ color: c, textColor: tc, variant: v, size: s }) => ({
                ...resolveInputRootSize(theme, s),
                ...resolveInputRootStyles(theme, c, tc, error)[v],
            }),
        ),
        ...(disabled && { opacity: 0.5, cursor: "not-allowed" }),

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
