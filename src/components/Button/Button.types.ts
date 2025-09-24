import {
    type Color,
    type ColorLike,
    type ComponentEnvironment,
    type Responsive,
    type Size,
    type SizeValue,
    type Variant,
} from "@ui-types";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import type { PressableProps } from "react-native";

export interface ButtonPropsBase<T extends ComponentEnvironment> {
    /**
     * The variant of the button, which determines its style.
     * @default "solid"
     * @example "solid", "outlined", "soft", "plain"
     */
    variant?: T extends "web" ? Responsive<Variant> : Variant;
    /**
     * The color of the button, which can be a predefined color or a custom color.
     * @default "primary"
     * @example "primary", "neutral", "success", "info", "warning", "danger", "#ff5733"
     */
    color?: T extends "web" ? Responsive<Color | ColorLike> : Color | ColorLike;
    /**
     * The size of the button, which can be a predefined size or a custom size in pixels.
     * @default "md"
     * @example "sm", "md", "lg", 20
     */
    size?: T extends "web"
        ? Responsive<Size | SizeValue | number>
        : Size | SizeValue | number;

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

    /**
     * Content to display inside the button.
     */
    children?: ReactNode;
}

export type ButtonProps<T extends ComponentEnvironment> = ButtonPropsBase<T> &
    (T extends "web"
        ? Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "size">
        : PressableProps);
