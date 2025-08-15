import type { Color, ColorLike } from "@ui-types";
import type { HTMLAttributes, ReactNode } from "react";

export interface OptionProps extends HTMLAttributes<HTMLOptionElement> {
    value: string | number;

    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
    color?: Color | ColorLike;

    // For keyboard accessibility
    label?: string;
}
