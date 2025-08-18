import type {
    Color,
    ColorLike,
    Responsive,
    Size,
    SizeValue,
    Variant,
} from "@ui-types";
import { createContext, type ChangeEvent } from "react";

export interface CheckboxGroupContextType {
    color?: Responsive<Color | ColorLike>;
    variant?: Responsive<Variant>;
    size?: Responsive<Size | SizeValue | number>;

    name?: string;
    value?: string[];
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string[]) => void;
    disabled?: boolean;
}

export const CheckboxGroupContext =
    createContext<CheckboxGroupContextType | null>(null);
