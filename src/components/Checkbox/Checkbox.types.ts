import { type Color, type ColorLike, type Size, type Variant } from "@ui-types";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "size" | "type" | "value"
    > {
    /**
     * The label for the checkbox.
     * It can be a string or a ReactNode.
     */
    label?: ReactNode;
    /**
     * The controlled checked state of the checkbox.
     */
    checked?: boolean;
    /**
     * The default checked state of the checkbox.
     * This is used when the checkbox is uncontrolled.
     * If `checked` is provided, this will be ignored.
     */
    defaultChecked?: boolean;
    /**
     * Disables the checkbox.
     * When true, the checkbox cannot be interacted with.
     */
    disabled?: boolean;

    /**
     * Indicates whether the checkbox is in an indeterminate state.
     * This is typically used for checkboxes that represent a group of items
     * where some, but not all, items are checked.
     */
    indeterminate?: boolean;

    /**
     * The icon to display when the checkbox is checked.
     * If not provided, a default check icon will be used.
     */
    checkedIcon?: ReactNode;
    /**
     * The icon to display when the checkbox is unchecked.
     * If not provided, a default unchecked icon will be used.
     */
    uncheckedIcon?: ReactNode;
    /**
     * The icon to display when the checkbox is in an indeterminate state.
     * If not provided, a default indeterminate icon will be used.
     */
    indeterminateIcon?: ReactNode;

    /**
     * The color of the checkbox, which can be a predefined color or a custom color
     *
     * @default "neutral"
     */
    color?: Color | ColorLike;
    /**
     * The variant of the checkbox, which determines its style.
     *
     * @default "solid"
     */
    variant?: Variant;
    /**
     * The size of the checkbox, which can be a predefined size or a custom size in pixels.
     * @default "md"
     */
    size?: Size | number;

    /**
     * This is the directio of the checkbox label.
     * If true, the label will be displayed on the left side of the checkbox.
     * If false, the label will be displayed on the right side of the checkbox.
     */
    rtl?: boolean;

    value?: string;
}
