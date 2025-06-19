import { type ButtonHTMLAttributes, type ReactNode } from "react";
import {
    type Color,
    type ColorLike,
    type Size,
    type Variant,
} from "../../../types";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    variant?: Variant;
    color?: Color | ColorLike;
    size?: Size | number;

    loading?: boolean;
    loadingIndicator?: ReactNode;

    disabled?: boolean;
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
}

export interface ButtonGroupProps {
    color?: Color | ColorLike;
    disabled?: boolean;
    orientation?: ButtonGroupOrientation;

    size?: Size | number;
    variant?: Variant;
    loading?: boolean;

    separatorColor?: Color | ColorLike;

    spacing?: number;

    children: ReactNode;
}
