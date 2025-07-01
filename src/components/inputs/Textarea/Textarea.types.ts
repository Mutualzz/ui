import type { ReactNode, TextareaHTMLAttributes } from "react";
import type {
    Color,
    ColorLike,
    Size,
    TypographyColor,
    Variant,
} from "../../../types";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    color?: Color | ColorLike;
    textColor?: TypographyColor | "inherit";
    variant?: Variant;
    size?: Size | number;

    value?: string;

    resizable?: boolean;

    startDecorator?: ReactNode;
    endDecorator?: ReactNode;

    error?: boolean;

    minRows?: number;
    maxRows?: number;
}
