import type { InputHTMLAttributes, ReactNode } from "react";
import type { Color, ColorLike, Size, Variant } from "../../../types";

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    color?: Color | ColorLike;
    variant?: Variant;
    size?: Size | number;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    fullWidth?: boolean;
    error?: boolean;
}
