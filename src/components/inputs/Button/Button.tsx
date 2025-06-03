import { type ReactNode, type Ref } from "react";

import styled from "../../../utils/styled";
import { CircularProgress } from "../../feedback/CircularProgress/CircularProgress";

import { type Size } from "../../../types";
import { resolveButtonStyles, variantColors } from "./Button.helpers";
import { type ButtonProps } from "./Button.types";

const ButtonWrapper = styled("button")<ButtonProps>(
    ({
        disabled,
        size = "md",
        theme,
        color = "primary",
        variant = "plain",
    }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        ...(disabled && { opacity: 0.5, pointerEvents: "none" }),
        ...resolveButtonStyles(size),
        ...variantColors(theme, color)[variant],
    }),
);

const ButtonContent = styled("span")<{
    loading?: boolean;
}>(({ loading }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    width: "auto",
    height: "100%",
    opacity: loading ? 0 : 1,
    boxSizing: "border-box",
}));

const SpinnerOverlay = styled("span")({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
});

const IconWrapper = styled("span")<{
    position: "start" | "end";
    size?: Size | number;
    childrenContent?: ReactNode;
}>(({ position, size, childrenContent }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: size === "sm" ? "1.2em" : size === "lg" ? "1.5em" : "1.3em",
    marginLeft: childrenContent && position === "end" ? "0.25em" : 0,
    marginRight: childrenContent && position === "start" ? "0.25em" : 0,
    flexShrink: 0,
    flexGrow: 0,
}));

export const Button = (
    {
        variant = "solid",
        color = "primary",
        size = "md",
        loading,
        startIcon,
        endIcon,
        disabled,
        children,
        ...props
    }: ButtonProps & { children?: ReactNode },
    ref: Ref<HTMLButtonElement>,
) => (
    <ButtonWrapper
        {...props}
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        disabled={loading || disabled}
        loading={loading}
    >
        {loading && (
            <SpinnerOverlay>
                <CircularProgress
                    variant={
                        variant === "solid" || variant === "soft"
                            ? "plain"
                            : "soft"
                    }
                    color={color}
                    size="sm"
                />
            </SpinnerOverlay>
        )}

        {startIcon && (
            <IconWrapper
                childrenContent={children}
                position="start"
                size={size}
            >
                {startIcon}
            </IconWrapper>
        )}
        <ButtonContent loading={loading}>{children}</ButtonContent>
        {endIcon && (
            <IconWrapper childrenContent={children} position="end" size={size}>
                {endIcon}
            </IconWrapper>
        )}
    </ButtonWrapper>
);
