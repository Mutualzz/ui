import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";
import {
    type Color,
    type ColorLike,
    type Size,
    type Variant,
} from "../../../types";

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    label?: ReactNode;
    disabled?: boolean;

    color?: Color | ColorLike;
    variant?: Variant;
    size?: Size | number;

    uncheckedIcon?: ReactNode;
    checkedIcon?: ReactNode;

    rtl?: boolean;
}

export interface RadioGroupProps {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    disabled?: boolean;
    row?: boolean;
    children: ReactNode;
}
