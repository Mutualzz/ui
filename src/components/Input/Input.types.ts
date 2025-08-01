import type {
    Color,
    ColorLike,
    Size,
    TypographyColor,
    Variant,
} from "@ui-types";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputType =
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    /**
     * The color of the input element.
     * Can be a predefined color or a custom color.
     * @default "neutral"
     */
    color?: Color | ColorLike;
    /**
     * The text color of the input element.
     * Can be a predefined color or a custom color.
     * If set to "inherit", the input will inherit the text color from its parent.
     * @default "inherit"
     */
    textColor?: TypographyColor | "inherit";
    /**
     * The variant of the input element.
     * Determines the style of the input element.
     * Can be "outlined", "solid", "plain", or "soft".
     * @default "outlined"
     */
    variant?: Variant;
    /**
     * The size of the input element.
     * Can be a predefined size ("sm", "md", "lg") or a custom size in pixels.
     * If a number is provided, it will be used as the font size.
     * @default "md"
     */
    size?: Size | number;

    /**
     * Optional start decorator to render before the input element.
     * This can be used to display icons or additional content.
     */
    startDecorator?: ReactNode;
    /**
     * Optional end decorator to render after the input element.
     * This can be used to display icons or additional content.
     */
    endDecorator?: ReactNode;

    /**
     * If true, the input will take the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * If true, the input will be displayed in an error state.
     * This can be used to indicate validation errors or issues with the input.
     * @default false
     */
    error?: boolean;

    /**
     * The type of the input element.
     * Determines the input behavior and validation.
     * Can be one of the following: "date", "datetime-local", "email",
     * "month", "number", "password", "search", "tel", "text",
     * "time", "url", or "week".
     * @default "text"
     */
    type?: InputType;
}
