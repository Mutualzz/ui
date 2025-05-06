import type { HTMLAttributes, ReactNode } from "react";
import { Color, ColorLike } from "../../../types";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerInset = "none" | "start" | "end";

export type DividerVariant = "solid" | "dashed" | "dotted" | "double";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    orientation?: DividerOrientation;
    inset?: DividerInset;

    lineColor?: Color | ColorLike;
    textColor?: Color | ColorLike;
    variant?: DividerVariant;

    children?: ReactNode;
}
