import type { PaperProps } from "@components/Paper/Paper.types";
import type { Responsive, Size, SizeValue } from "@ui-types";
import type { ReactNode } from "react";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps extends Omit<PaperProps, "content"> {
    size?: Responsive<Size | SizeValue | number>;
    trigger?: ReactNode;

    isOpen?: boolean;

    disablePortal?: boolean;

    closeOnClickOutside?: boolean;
    closeOnInteract?: boolean;

    placement?: PopoverPlacement;

    nonTranslucent?: Responsive<boolean>;
}
