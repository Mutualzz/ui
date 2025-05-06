import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Color, ColorLike, Size, Variant } from "../../../types";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    variant?: Variant;
    color?: Color | ColorLike;
    size?: Size | number;
    loading?: boolean;
    disabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}
