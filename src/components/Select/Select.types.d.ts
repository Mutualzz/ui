import type { Color, ColorLike, Size, Variant } from "@ui-types";
import type { ReactNode, SelectHTMLAttributes } from "react";

export interface SelectProps<T = string>
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "size" | "value" | "defaultValue"
    > {
    size?: Size | number;
    variant?: Variant;
    color?: Color | ColorLike;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    multiple?: boolean;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;

    value?: T | T[] | null;
    defaultValue?: T | T[] | null;
}
