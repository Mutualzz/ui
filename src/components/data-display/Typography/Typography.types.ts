import { HTMLAttributes } from "react";
import { Color, ColorLike, TypographyLevel, Variant } from "../../../types";

export type TypographyVariant = Variant | "none";

export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
    level?: TypographyLevel;
    color?: Color | ColorLike;
    variant?: TypographyVariant;
}
