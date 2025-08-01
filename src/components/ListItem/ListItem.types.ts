import type { Color, ColorLike, Size, Variant } from "@ui-types";
import type { HTMLAttributes, ReactNode } from "react";

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
    color?: Color | ColorLike;
    variant?: Variant;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    marker?: string;

    size?: Size | number;
}
