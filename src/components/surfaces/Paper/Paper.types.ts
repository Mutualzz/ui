import type { BoxProps } from "components/layout/Box/Box.types";
import { type Color, type ColorLike, type Variant } from "../../../types";

export type PaperVariant = Variant | "elevation";

export interface PaperProps extends BoxProps {
    color?: Color | ColorLike;
    variant?: PaperVariant;

    elevation?: number;
}
