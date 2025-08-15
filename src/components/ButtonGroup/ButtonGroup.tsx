import styled from "@styled";
import type { Color, ColorLike, Orientation, Variant } from "@ui-types";
import { ButtonGroupContext } from "./ButtonGroup.context";
import { resolveButtonGroupStyles } from "./ButtonGroup.helpers";
import type { ButtonGroupProps } from "./ButtonGroup.types";

const ButtonGroupRoot = styled("div")<{
    orientation: Orientation;
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
            cursor: "not-allowed",
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

ButtonGroupRoot.displayName = "ButtonGroupRoot";

/**
 * ButtonGroup component that renders a group of buttons with shared styles and properties.
 * It allows for customization of color, variant, size, orientation, and spacing.
 * The buttons can be disabled and can show a loading state.
 * The component automatically applies styles to its children based on the provided props.
 * It supports both horizontal and vertical orientations, with optional separator colors.
 * The buttons in the group can inherit properties from the Button component, such as size, color, variant, and loading state.
 * The `children` prop should contain Button components or valid React elements.
 */
const ButtonGroup = ({
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
    return (
        <ButtonGroupContext.Provider
            value={{
                color,
                variant,
                size,
                disabled,
                loading,
            }}
        >
            <ButtonGroupRoot
                spacing={spacing}
                orientation={orientation}
                color={color}
                variant={variant}
                separatorColor={separatorColor}
            >
                {children}
            </ButtonGroupRoot>
        </ButtonGroupContext.Provider>
    );
};

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
