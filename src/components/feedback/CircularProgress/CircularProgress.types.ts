import { Color, ColorLike, Size, Variant } from "../../../types";

export interface CircularProgressProps {
    size?: Size | number;
    variant?: Variant;
    color?: Color | ColorLike;
    determinate?: boolean;
    value?: number;
}
