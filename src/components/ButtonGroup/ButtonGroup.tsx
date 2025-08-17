import styled from "@styled";
import type {
    Color,
    ColorLike,
    Orientation,
    Responsive,
    Variant,
} from "@ui-types";
import { resolveResponsiveMerge } from "@utils/responsive";
import { ButtonGroupContext } from "./ButtonGroup.context";
import { resolveButtonGroupStyles } from "./ButtonGroup.helpers";
import type { ButtonGroupProps } from "./ButtonGroup.types";

const ButtonGroupRoot = styled("div")<{
    orientation: Responsive<Orientation>;
    spacing: Responsive<number>;
    color?: Responsive<Color | ColorLike>;
    variant?: Responsive<Variant>;
    separatorColor?: Responsive<Color | ColorLike>;
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
        ...resolveResponsiveMerge(theme, { spacing }, ({ spacing: gap }) =>
            gap > 0 ? { gap } : {},
        ),
        ...(disabled && {
            pointerEvents: "none",
            opacity: 0.5,
            cursor: "not-allowed",
        }),

        ...resolveResponsiveMerge(
            theme,
            { spacing, orientation, color, variant, separatorColor },
            ({
                spacing: gap,
                orientation: o,
                color: c,
                variant: v,
                separatorColor: sc,
            }) => ({
                ...(gap > 0 ? { gap } : {}),
                ...(gap === 0 && {
                    "& > button": resolveButtonGroupStyles(theme, o, c, v, sc),
                }),
            }),
        ),
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
                color={color as string}
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
