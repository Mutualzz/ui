import { Children, cloneElement, isValidElement, type FC } from "react";
import type { Color, ColorLike, Variant } from "../../../types";
import styled from "../../../utils/styled";
import { resolveButtonGroupStyles } from "./Button.helpers";
import {
    type ButtonGroupOrientation,
    type ButtonGroupProps,
    type ButtonProps,
} from "./Button.types";

const ButtonGroupRoot = styled("div")<{
    orientation: ButtonGroupOrientation;
    spacing: number;
    color?: Color | ColorLike;
    variant?: Variant;
}>(({ theme, color, variant, orientation, spacing }) => ({
    display: "inline-flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "stretch",
    ...(spacing > 0 && { gap: spacing }),

    "& > button": spacing === 0 && {
        ...resolveButtonGroupStyles(theme, orientation, color, variant),
    },
}));

export const ButtonGroup: FC<ButtonGroupProps> = ({
    orientation = "horizontal",
    spacing = 0,
    color,
    size,
    variant,
    disabled,
    loading,
    children,
}) => {
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
        >
            {items}
        </ButtonGroupRoot>
    );
};
