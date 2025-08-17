import type { PaperProps } from "@components/Paper/Paper.types";
import type { Responsive, Size, SizeValue } from "@ui-types";
import type { ReactNode } from "react";

export interface PopoverProps extends Omit<PaperProps, "content"> {
    size?: Responsive<Size | SizeValue | number>;
    content?: ReactNode;

    isOpen?: boolean;

    usePortal?: boolean;

    closeOnClickOutside?: boolean;
}
