import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    /**
     * The variant of the button, which determines its style.
     * @default "solid"
     */
    variant?: Variant;
    /**
     * The color of the button, which can be a predefined color or a custom color.
     * @default "primary"
     */
    color?: Color | ColorLike;
    /**
     * The size of the button, which can be a predefined size or a custom size in pixels.
     * @default "md"
     */
    size?: Size | number;

    /**
     * Indicates whether the button is in a loading state.
     * If true, the button will show a loading indicator and be disabled.
     * @default false
     */
    loading?: boolean;
    /**
     * Custom loading indicator to display when the button is in a loading state.
     * If not provided, a default loading spinner will be shown.
     */
    loadingIndicator?: ReactNode;

    /**
     * Content to display at the start of the button (e.g., an icon).
     */
    startDecorator?: ReactNode;
    /**
     * Content to display at the end of the button (e.g., an icon).
     */
    endDecorator?: ReactNode;
}
