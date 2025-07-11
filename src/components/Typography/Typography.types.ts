import { type HTMLAttributes } from "react";
import type { Color, ColorLike, TypographyLevel, Variant } from "../../types";
import type { FontWeight } from "../../types/Typography.props";

export type TypographyVariant = Variant | "none";

export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
    level?: TypographyLevel;
    weight?: FontWeight;
    color?: Color | ColorLike;
    variant?: TypographyVariant;
}
