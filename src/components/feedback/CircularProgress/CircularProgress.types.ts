import type { ReactNode } from "@tanstack/react-router";
import {
    type Color,
    type ColorLike,
    type Size,
    type Variant,
} from "../../../types";

export interface CircularProgressProps {
    size?: Size | number;
    variant?: Variant;
    color?: Color | ColorLike;
    determinate?: boolean;
    value?: number;

    children?: ReactNode;
}
