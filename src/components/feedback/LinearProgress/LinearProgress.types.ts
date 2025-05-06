import { Color, ColorLike, Size, Variant } from "../../../types";

export type LinearProgressAnimation =
    | "slide"
    | "wave"
    | "bounce"
    | "scale-in-out";

export interface LinearProgressProps {
    length?: Size | number;
    thickness?: Size | number;
    variant?: Variant;
    color?: Color | ColorLike;
    animation?: LinearProgressAnimation;
    determinate?: boolean;
    value?: number;
}
