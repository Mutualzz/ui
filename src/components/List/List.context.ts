import type {
    Color,
    ColorLike,
    Orientation,
    Size,
    SizeValue,
    Variant,
} from "@ui-types";
import { createContext } from "react";

interface ListContextType {
    color?: Color | ColorLike;
    size?: Size | SizeValue | number;
    variant?: Variant;
    orientation?: Orientation;

    nesting?: number;
    marker?: string | string[] | ((nesting: number) => string);
}

export const ListContext = createContext<ListContextType>({
    color: "neutral",
    variant: "plain",
    size: "md",
    nesting: 0,
    marker: undefined,
});
