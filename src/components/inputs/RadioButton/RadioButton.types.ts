import { ReactNode } from "@tanstack/react-router";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { Color, ColorLike, Size, Variant } from "../../../types";

export interface RadioButtonProps
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

export interface RadioButtonGroupProps {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    disabled?: boolean;
    row?: boolean;
    children: ReactNode;
}
