import type { Color, ColorLike, Size, SizeValue, Variant } from "@ui-types";
import type { ReactNode, SelectHTMLAttributes } from "react";

export interface SelectProps<T = string | number>
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "size" | "value" | "defaultValue"
    > {
    size?: Size | SizeValue | number;
    variant?: Variant;
    color?: Color | ColorLike;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    placeholder?: string;

    multiple?: boolean;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;

    value?: T | T[];
    defaultValue?: T | T[];

    onValueChange?: (value: T | T[]) => void;
}
