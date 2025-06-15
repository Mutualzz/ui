import { type Color, type ColorLike, type Variant } from "../../../types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps {
    color?: Color | ColorLike;
    variant?: PaperVariant;

    elevation?: number;
}
