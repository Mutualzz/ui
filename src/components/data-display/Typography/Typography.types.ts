import { type HTMLAttributes } from "react";
import {
    type Color,
    type ColorLike,
    type TypographyLevel,
    type Variant,
} from "../../../types";

export type TypographyVariant = Variant | "none";

export interface TypographyProps extends HTMLAttributes<HTMLSpanElement> {
    level?: TypographyLevel;
    color?: Color | ColorLike;
    variant?: TypographyVariant;
}
