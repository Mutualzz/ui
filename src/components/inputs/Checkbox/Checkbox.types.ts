import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { Color, ColorLike, Size, Variant } from "../../../types";

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
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

    rtl?: boolean;
}

export interface CheckboxGroupProps {
    name: string;
    value?: string[];
    defaultValue?: string[];
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string[]) => void;
    disabled?: boolean;
    row?: boolean;
    children: ReactNode;
}
