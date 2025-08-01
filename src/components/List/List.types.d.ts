import type { Color, ColorLike, Orientation, Size, Variant } from "@ui-types";
import type { allowedListStyleTypes } from "@utils";
import type { HTMLProps } from "react";

export type AllowedListStyleTypes = (typeof allowedListStyleTypes)[number];

export interface ListProps
    extends Omit<HTMLProps<HTMLUListElement>, "size" | "wrap"> {
    /**
     * Color of the list
     * Can be a predefined color or a custom color.
     * @default "neutral"
     */
    color?: Color | ColorLike;

    /**
     * Variant of the list
     * Can be "solid", "outlined", "plain" or "soft".
     * @default "plain"
     */
    variant?: Variant;

    /**
     * Size of the list
     * @default "md"
     */
    size?: Size | number;

    /**
     * Marker to use for the list items.
     * can be anything from "disc", "circle", "square" to custom markers like "•", "◦", etc.
     */
    marker?: string | string[] | ((nesting: number) => string);

    /**
     * Orientation of the list
     * Can be "vertical" or "horizontal".
     * @default "vertical"
     */
    orientation?: Orientation;
}
