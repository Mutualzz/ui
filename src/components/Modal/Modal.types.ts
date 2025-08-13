import type { PaperProps } from "@components/Paper/Paper.types";

export interface ModalProps extends PaperProps {
    open: boolean;

    container?: HTMLDivElement | (() => HTMLDivElement);

    disableAutoFocus?: boolean;
    disableEnforceFocus?: boolean;
    disableEscapeKeyDown?: boolean;
    disablePortal?: boolean;
    disableRestoreFocus?: boolean;
    disableScrollLock?: boolean;
    hideBackdrop?: boolean;
    keepMounted?: boolean;

    layout?: "center" | "fullscreen";

    onClose?: () => void;
}
