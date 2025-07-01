import type { InputHTMLAttributes, ReactNode } from "react";
import type {
    Color,
    ColorLike,
    Size,
    TypographyColor,
    Variant,
} from "../../../types";

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

export interface InputBaseProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    color?: Color | ColorLike;
    textColor?: TypographyColor | "inherit";
    variant?: Variant;
    size?: Size | number;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    fullWidth?: boolean;
    error?: boolean;

    type?: InputType;
}

export interface InputPasswordProps extends Omit<InputBaseProps, "type"> {
    type?: "password";

    visible?: boolean;
    iconVisible?: boolean;

    showPasswordIcon?: ReactNode;
    hidePasswordIcon?: ReactNode;

    onTogglePassword?: () => void;
    onShowPassword?: () => void;
    onHidePassword?: () => void;
}

export interface InputNumberProps
    extends Omit<InputBaseProps, "type" | "value"> {
    type?: "number";

    step?: number;
    min?: number;
    max?: number;

    value?: string;

    onIncrement?: () => void;
    onDecrement?: () => void;
}
