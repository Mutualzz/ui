import type { InputHTMLAttributes, ReactNode } from "react";
import type { Color, ColorLike, Size, Variant } from "../../../types";

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
    color?: Color | ColorLike;
    variant?: Variant;
    size?: Size | number;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    fullWidth?: boolean;
    error?: boolean;

    type?: InputType;
}
