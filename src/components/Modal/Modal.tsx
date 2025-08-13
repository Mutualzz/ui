import { Portal } from "@components/Portal/Portal";
import styled from "@styled";
import {
    useCallback,
    useEffect,
    useRef,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode,
    type Ref,
} from "react";
import type { ModalProps } from "./Modal.types";

const ModalRoot = styled("div")<{
    open?: boolean;
    layout: "center" | "fullscreen";
}>(({ theme, open, layout }) => ({
    '& ~ [role="listbox"]': {
        // target all the listbox (Autocomplete, Menu, Select, etc.) that uses portal
        zIndex: `calc(${theme.zIndex.modal} + 1)`,
    },
    position: "fixed",
    zIndex: theme.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    display: open ? (layout === "center" ? "flex" : "block") : "none",
    ...(layout === "center" && {
        alignItems: "center",
        justifyContent: "center",
    }),
    ...(layout === "fullscreen" && {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
    }),
}));

ModalRoot.displayName = "ModalRoot";

const ModalBackdrop = styled("div")({
    zIndex: -1,
    position: "fixed",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    WebkitTapHighlightColor: "transparent",
    backdropFilter: "blur(8px)",
});

ModalBackdrop.displayName = "ModalBackdrop";

const ScrollLock = () => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
    return null;
};

const FocusTrap = ({
    active,
    children,
    disableEnforceFocus,
}: {
    active: boolean;
    children: ReactNode;
    disableEnforceFocus?: boolean;
}) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active || disableEnforceFocus) return;

        const node = rootRef.current;
        if (!node) return;

        const focusableElements = node.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        const firstElement: HTMLElement | null = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        node.addEventListener("keydown", handleKeyDown);

        // We need this rule cuz its a falsy
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (firstElement ?? node).focus();

        return () => {
            node.removeEventListener("keydown", handleKeyDown);
        };
    }, [active, disableEnforceFocus]);

    return <div ref={rootRef}>{children}</div>;
};

const Modal = (
    {
        children,
        container,
        disableAutoFocus = false,
        disableEnforceFocus = false,
        disableEscapeKeyDown = false,
        disablePortal = false,
        disableRestoreFocus = false,
        disableScrollLock = false,
        hideBackdrop = false,
        keepMounted = false,
        layout = "center",
        onClose,
        onKeyDown,
        open,
        ...props
    }: ModalProps,
    ref?: Ref<HTMLDivElement>,
) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const lastFocusedElementRef = useRef<Element | null>(null);

    useEffect(() => {
        if (open) {
            lastFocusedElementRef.current = document.activeElement;
        }
    }, [open]);

    useEffect(() => {
        if (!open && !disableRestoreFocus) {
            if (lastFocusedElementRef.current instanceof HTMLElement) {
                lastFocusedElementRef.current.focus();
            }
        }
    }, [open, disableRestoreFocus]);

    useEffect(() => {
        if (open && !disableAutoFocus) {
            modalRef.current?.focus();
        }
    }, [open, disableAutoFocus]);

    useEffect(() => {
        if (open && !disableScrollLock) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [open, disableScrollLock]);

    const handleKeyDown = useCallback(
        (e: ReactKeyboardEvent<HTMLDivElement>) => {
            if (!disableEscapeKeyDown && e.key === "Escape") {
                onClose?.();
            }
            onKeyDown?.(e);
        },
        [disableEscapeKeyDown, onClose, onKeyDown],
    );

    if (!open && !keepMounted) return null;

    const modalContent = (
        <FocusTrap active={open} disableEnforceFocus={disableEnforceFocus}>
            <ModalRoot
                layout={layout}
                open={open}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                ref={(node: HTMLDivElement | null) => {
                    modalRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                {...props}
            >
                {!hideBackdrop && <ModalBackdrop onClick={onClose} />}

                {children}
            </ModalRoot>
        </FocusTrap>
    );

    return (
        <>
            {!disableScrollLock && open && <ScrollLock />}
            <Portal container={container} disablePortal={disablePortal}>
                {modalContent}
            </Portal>
        </>
    );
};

Modal.displayName = "Modal";

export { Modal, ModalBackdrop, ModalRoot };
