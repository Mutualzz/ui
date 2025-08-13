import type { HTMLAttributes } from "react";

/**
 * Props for the Box component.
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * If true, the Box will be displayed as an inline-block element; otherwise, it will be a block element.
     */
    inline?: boolean;
}
