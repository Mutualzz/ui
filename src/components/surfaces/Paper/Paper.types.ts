import { type Color, type ColorLike, type Variant } from "../../../types";
import type { BoxProps } from "../../layout/Box/Box.types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps extends BoxProps {
    color?: Color | ColorLike;
    variant?: PaperVariant;

    elevation?: number;
}
