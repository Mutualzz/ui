import type { HTMLAttributes, ReactNode } from "react";
import { type Color, type ColorLike } from "../../../types";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerInset = "none" | "start" | "end";

export type DividerVariant = "solid" | "dashed" | "dotted" | "double";

// NOTE - I don't know if I should use typography for the text color or the feedback colors. I'll keep the feedback colors for now
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    orientation?: DividerOrientation;
    inset?: DividerInset;

    lineColor?: Color | ColorLike;
    textColor?: Color | ColorLike;
    variant?: DividerVariant;

    children?: ReactNode;
}
