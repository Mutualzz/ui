import type { HTMLAttributes, ReactNode } from "react";
import { Color, ColorLike, Size, Variant } from "../../../types";

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;

    indeterminate?: boolean;

    checkedIcon?: ReactNode;
    uncheckedIcon?: ReactNode;
    indeterminateIcon?: ReactNode;

    color?: Color | ColorLike;
    size?: Size | number;
    variant?: Variant;
}
