import type { Color, ColorLike, Responsive, Variant } from "@ui-types";
import type { HTMLAttributes } from "react";

export type DrawerAnchor = "left" | "right" | "top" | "bottom";
export type DrawerConsistency = "permanent" | "temporary";

export interface DrawerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
    color?: Responsive<Color | ColorLike>;
    variant?: Responsive<Variant | "elevation">;

    elevation?: Responsive<number>;

    anchor?: Responsive<DrawerAnchor>;
    hideBackdrop?: Responsive<boolean>;
    onOpen: () => void;
    onClose: () => void;
    open: boolean;

    consistency?: Responsive<DrawerConsistency>;

    swipeable?: boolean;
}
