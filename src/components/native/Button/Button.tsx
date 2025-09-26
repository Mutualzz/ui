import styled from "@emotion/native";
import type { Size } from "@ui-types";
import { Pressable } from "react-native";
import { resolveButtonContainerStyles } from "./Button.helpers";
import type { ButtonProps } from "./Button.types";

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

const ButtonWrapper = styled(Pressable)<ButtonProps>(
    ({ theme, color = "primary", variant = "solid", disabled }) => ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        borderRadius: 6,
        flexShrink: 0,
        lineHeight: 1.2,
        ...(disabled && {
            opacity: 0.5,
            pointerEvents: "none",
        }),
        ...resolveButtonContainerStyles(theme, color)[variant],
    }),
);
