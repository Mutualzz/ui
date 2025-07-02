import {
    type Color,
    type ColorLike,
    type TypographyColor,
    type Variant,
} from "../../../types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps {
    color?: Color | ColorLike;
    textColor?: TypographyColor | "inherit";
    variant?: PaperVariant;

    elevation?: number;
}
