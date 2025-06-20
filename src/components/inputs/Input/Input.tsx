import type { ReactNode, Ref } from "react";
import type { Size } from "../../../types";
import styled from "../../../utils/styled";
import { resolveInputSize, resolveInputStyles } from "./Input.helpers";
import type { InputProps } from "./Input.types";

const InputRoot = styled("div")<{ fullWidth: boolean }>(({ fullWidth }) => ({
    display: "inline-flex",
    width: fullWidth ? "100%" : "auto",
    position: "relative",
}));

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

const StyledInput = styled("input")<InputProps>(
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
    }),
);

export const Input = (
    {
        color = "neutral",
        variant = "outlined",
        size = "md",
        startDecorator,
        endDecorator,
        fullWidth = false,
        error = false,
        disabled = false,
        children,
        ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement>,
) => {
    return (
        <InputRoot fullWidth={fullWidth}>
            {startDecorator && (
                <IconWrapper
                    childrenContent={children}
                    position="start"
                    size={size}
                >
                    {startDecorator}
                </IconWrapper>
            )}
            <StyledInput
                ref={ref}
                color={color}
                variant={variant}
                size={size as number}
                fullWidth={fullWidth}
                error={error}
                disabled={disabled}
                {...props}
            />
            {endDecorator && (
                <IconWrapper
                    childrenContent={children}
                    position="end"
                    size={size}
                >
                    {endDecorator}
                </IconWrapper>
            )}
        </InputRoot>
    );
};
