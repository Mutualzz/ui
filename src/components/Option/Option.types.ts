import type { Color, ColorLike, Size, SizeValue, Variant } from "@ui-types";
import type { HTMLAttributes, ReactNode } from "react";

export interface OptionProps extends HTMLAttributes<HTMLDivElement> {
    value: string | number;

    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
    color?: Color | ColorLike;
    variant?: Variant;
    size?: Size | SizeValue | number;

    // For keyboard accessibility
    label?: string;
}
