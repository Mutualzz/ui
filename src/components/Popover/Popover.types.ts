import type { PaperProps } from "@components/Paper/Paper.types";
import type { Size, SizeValue } from "@ui-types";
import type { ReactNode } from "react";

export interface PopoverProps extends Omit<PaperProps, "content"> {
    size?: Size | SizeValue | number;
    content?: ReactNode;

    isOpen?: boolean;

    usePortal?: boolean;

    closeOnClickOutside?: boolean;
}
