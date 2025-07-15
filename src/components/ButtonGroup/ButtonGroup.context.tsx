import type { Color, ColorLike, Size, Variant } from "@ui-types";
import { createContext } from "react";

export interface ButtonGroupContextProps {
    color?: Color | ColorLike;
    variant?: Variant;
    size?: Size | number;
    disabled?: boolean;
    loading?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextProps | null>(
    null,
);
