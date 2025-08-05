import { useContext, type ReactNode, type Ref } from "react";

import { CircularProgress } from "@components/CircularProgress/CircularProgress";
import styled from "@styled";

import { ButtonGroupContext } from "../ButtonGroup/ButtonGroup.context";
import { DecoratorWrapper } from "../DecoratorWrapper/DecoratorWrapper";
import { resolveButtonSize, resolveButtonStyles } from "./Button.helpers";
import { type ButtonProps } from "./Button.types";

const ButtonWrapper = styled("button")<ButtonProps>(
    ({
        disabled,
        size = "md",
        theme,
        color = "primary",
        variant = "solid",
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
        ...resolveButtonSize(theme, size),
        ...resolveButtonStyles(theme, color)[variant],
    }),
);

ButtonWrapper.displayName = "ButtonWrapper";

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

ButtonContent.displayName = "ButtonContent";

const SpinnerOverlay = styled("span")({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
});

SpinnerOverlay.displayName = "SpinnerOverlay";

/**
 * Button component that renders a styled button element with various properties.
 * It supports different variants, colors, sizes, and loading states.
 * The button can also include start and end decorators for additional content.
 */
const Button = (
    {
        variant: propVariant,
        color: propColor,
        size: propSize,
        loading: propLoading,
        loadingIndicator,
        startDecorator,
        endDecorator,
        disabled: propDisabled,
        children,
        ...props
    }: ButtonProps & { children?: ReactNode },
    ref?: Ref<HTMLButtonElement>,
) => {
    const group = useContext(ButtonGroupContext);

    const variant = propVariant ?? group?.variant ?? "solid";
    const color = propColor ?? group?.color ?? "primary";
    const size = propSize ?? group?.size ?? "md";
    const loading = propLoading ?? group?.loading ?? false;
    const disabled = propDisabled ?? group?.disabled ?? false;

    return (
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
                    {loadingIndicator ? (
                        loadingIndicator
                    ) : (
                        <CircularProgress
                            variant={
                                variant === "solid" || variant === "soft"
                                    ? "plain"
                                    : "soft"
                            }
                            color={color}
                            size="sm"
                        />
                    )}
                </SpinnerOverlay>
            )}

            {startDecorator && (
                <DecoratorWrapper
                    parentContent={children}
                    position="start"
                    size={size}
                >
                    {startDecorator}
                </DecoratorWrapper>
            )}
            <ButtonContent loading={loading}>{children}</ButtonContent>
            {endDecorator && (
                <DecoratorWrapper
                    parentContent={children}
                    position="end"
                    size={size}
                >
                    {endDecorator}
                </DecoratorWrapper>
            )}
        </ButtonWrapper>
    );
};

Button.displayName = "Button";

export { Button };
