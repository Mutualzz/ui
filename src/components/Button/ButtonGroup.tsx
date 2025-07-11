import { Children, cloneElement, isValidElement } from "react";
import type { Color, ColorLike, Variant } from "../../types";
import styled from "../../utils/styled";
import { resolveButtonGroupStyles } from "./Button.helpers";
import type {
    ButtonGroupOrientation,
    ButtonGroupProps,
    ButtonProps,
} from "./Button.types";

const ButtonGroupRoot = styled("div")<{
    orientation: ButtonGroupOrientation;
    spacing: number;
    color?: Color | ColorLike;
    variant?: Variant;
    separatorColor?: Color | ColorLike;
    disabled?: boolean;
}>(
    ({
        theme,
        color,
        variant,
        orientation,
        spacing,
        separatorColor,
        disabled,
    }) => ({
        display: "inline-flex",
        flexWrap: "wrap",
        flexDirection: orientation === "vertical" ? "column" : "row",
        alignItems: "stretch",
        ...(spacing > 0 && { gap: spacing }),
        ...(disabled && {
            pointerEvents: "none",
            opacity: 0.5,
        }),

        "& > button": spacing === 0 && {
            ...resolveButtonGroupStyles(
                theme,
                orientation,
                color,
                variant,
                separatorColor,
            ),
        },
    }),
);

export const ButtonGroup = ({
    orientation = "horizontal",
    spacing = 0,
    color,
    size,
    variant,
    disabled,
    loading,
    separatorColor,
    children,
}: ButtonGroupProps) => {
    const items = Children.map(children, (child) => {
        if (!isValidElement<ButtonProps>(child)) return child;

        return cloneElement(child, {
            variant: variant ?? child.props.variant,
            color: color ?? child.props.color,
            size: size ?? child.props.size,
            disabled: disabled ?? child.props.disabled,
            loading: loading ?? child.props.loading,
        });
    });

    return (
        <ButtonGroupRoot
            spacing={spacing}
            orientation={orientation}
            color={color}
            variant={variant}
            separatorColor={separatorColor}
        >
            {items}
        </ButtonGroupRoot>
    );
};
