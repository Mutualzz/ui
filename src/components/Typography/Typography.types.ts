import type {
    Color,
    ColorLike,
    ComponentEnvironment,
    Responsive,
    SystemProps,
    TypographyColor,
    TypographyLevel,
    Variant,
} from "@ui-types";
import type { Properties } from "csstype";
import type { TextStyle } from "react-native";

export type TypographyVariant = Variant | "none";

export interface TypographyPropsBase<T extends ComponentEnvironment> {
    /**
     * Typography Level.
     * This can be a predefined level like "h1", "h2", and etc.
     *
     * @default "inherit"
     * @example "h1", "h2", "h3", "inherit"
     */
    level?: T extends "web"
        ? Responsive<TypographyLevel | "inherit">
        : TypographyLevel | "inherit";

    /**
     * Font weight.
     * This can be a predefined weight like "light", "normal", "medium", "bold", or a custom number.
     * It determines the thickness of the text.
     *
     * @default "normal"
     * @example "light", "normal", "medium", "bold", 400
     */
    weight?: T extends "web"
        ? Responsive<Properties["fontWeight"]>
        : TextStyle["fontWeight"];

    /**
     * Color or color-like value for the typography.
     * This can be a color name, hex code, or any valid color format, doesn't apply on "none" variant.
     *
     * @default "neutral"
     * @example "primary", "neutral", "success", "info", "warning", "danger", "#ff5733"
     */
    color?: T extends "web" ? Responsive<Color | ColorLike> : Color | ColorLike;
    textColor?: T extends "web"
        ? Responsive<TypographyColor | ColorLike | "inherit">
        : TypographyColor | ColorLike | "inherit";

    /**
     * Variant of the typography.
     * This can be "solid", "outlined", "soft", "plain", or "none".
     * It determines the visual style of the typography.
     * "none" variant will not apply any styles.
     * It is useful for cases where you want to use the typography component without any additional styles.
     *
     * @default "none"
     * @example "solid", "outlined", "soft", "plain", "none"
     */
    variant?: T extends "web"
        ? Responsive<TypographyVariant>
        : TypographyVariant;
}

// Create a type alias that combines your interface with the conditional base type
export type TypographyProps<T extends ComponentEnvironment> =
    TypographyPropsBase<T> &
        (T extends "web"
            ? Omit<SystemProps<HTMLSpanElement>, "color">
            : TextStyle);
