import { CircularProgress } from "@components/CircularProgress/CircularProgress.web";
import styled from "@styled";
import type { Size } from "@ui-types";
import { resolveSize } from "@utils";
import { resolveResponsiveMerge } from "@utils/responsive";
import { forwardRef, useContext } from "react";
import { ButtonGroupContext } from "../ButtonGroup/ButtonGroup.context";
import { DecoratorWrapper } from "../DecoratorWrapper/DecoratorWrapper.web";
import { resolveButtonStyles } from "./Button.helpers";
import { type ButtonProps } from "./Button.types";

const baseSizeMap: Record<Size, number> = {
    sm: 12,
    md: 14,
    lg: 16,
};

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
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
        lineHeight: 1.2,
        ...(disabled && {
            opacity: 0.5,
            pointerEvents: "none",
        }),
        ...resolveResponsiveMerge(
            theme,
            { size, color, variant },
            ({ size: s, color: c, variant: v }) => {
                const resolvedSize = resolveSize(theme, s, baseSizeMap);
                return {
                    fontSize: resolvedSize,
                    padding: resolvedSize * 0.6,
                    ...resolveButtonStyles(theme, c)[v],
                };
            },
        ),
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
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
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
            type = "button",
            ...props
        },
        ref,
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
                type={type}
                ref={ref}
                variant={variant}
                color={color as string}
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
                    <DecoratorWrapper position="start">
                        {startDecorator}
                    </DecoratorWrapper>
                )}
                <ButtonContent loading={loading}>{children}</ButtonContent>
                {endDecorator && (
                    <DecoratorWrapper position="end">
                        {endDecorator}
                    </DecoratorWrapper>
                )}
            </ButtonWrapper>
        );
    },
);

Button.displayName = "Button";

export { Button };
