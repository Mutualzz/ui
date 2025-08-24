import { resolvePaperStyles } from "@components/Paper/Paper.helpers";
import { useTheme } from "@hooks/useTheme";
import type { Color, ColorLike, Responsive, Variant } from "@ui-types";
import { resolveResponsiveMerge } from "@utils/responsive";
import styled from "@utils/styled";
import { forwardRef, useEffect, useRef } from "react";
import {
    resolveAnchorStyles,
    resolveSwipeAreaStyles,
    useSwipeableDrawer,
} from "./Drawer.helpers";
import type { DrawerAnchor, DrawerProps } from "./Drawer.types";

const DrawerRoot = styled("div")<{
    color: Responsive<Color | ColorLike>;
    variant: Responsive<Variant | "elevation">;
    open: boolean;
    anchor: Responsive<DrawerAnchor>;
    elevation: Responsive<number>;
}>(({ theme, open, anchor, color, variant, elevation }) => ({
    position: "fixed",
    zIndex: theme.zIndex.drawer,
    background: theme.colors.surface,
    boxShadow: theme.shadows[4],
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    outline: 0,
    overflowY: "auto",

    ...resolveResponsiveMerge(
        theme,
        {
            anchor,
            color,
            variant,
            elevation,
        },
        ({ anchor: a, color: c, variant: v, elevation: e }) => ({
            ...resolveAnchorStyles(a),
            ...resolvePaperStyles(theme, c, "primary", e)[v],
            flexDirection: a === "left" || a === "right" ? "column" : "row",
            ...(open && {
                transform: "none",
            }),
        }),
    ),
}));

const DrawerBackdrop = styled("div")(({ theme }) => ({
    position: "fixed",
    zIndex: theme.zIndex.drawer - 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    WebkitTapHighlightColor: "transparent",
    backdropFilter: "blur(4px)",
}));

const FocusTrap = ({
    active,
    children,
}: {
    active: boolean;
    children: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!active) return;
        const node = ref.current;
        if (!node) return;
        const focusable = node.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        node.addEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (first ?? node).focus();
        return () => node.removeEventListener("keydown", handleKeyDown);
    }, [active]);
    return <div ref={ref}>{children}</div>;
};

const SwipeableArea = styled("div")<{
    anchor: DrawerAnchor;
}>(({ theme, anchor }) => ({
    ...resolveSwipeAreaStyles(theme, anchor),
}));

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    (
        {
            color = "primary",
            variant = "elevation",
            open,
            elevation = 0,
            hideBackdrop,
            onOpen,
            onClose,
            anchor = "left",
            swipeable = true,
            children,
            ...props
        },
        ref,
    ) => {
        const { theme } = useTheme();

        useEffect(() => {
            if (open) {
                const original = document.body.style.overflow;
                document.body.style.overflow = "hidden";
                return () => {
                    document.body.style.overflow = original;
                };
            }
        }, [open]);

        const {
            resolvedAnchor,
            handleTouchStart,
            handleTouchEnd,
            handleSwipeOpenStart,
            handleSwipeOpenEnd,
        } = useSwipeableDrawer({
            theme,
            anchor,
            swipeable,
            open,
            onOpen,
            onClose,
        });

        return (
            <>
                {!open && swipeable && (
                    <SwipeableArea
                        anchor={resolvedAnchor}
                        onTouchStart={handleSwipeOpenStart}
                        onTouchEnd={handleSwipeOpenEnd}
                        aria-hidden
                    />
                )}
                {!hideBackdrop && open && <DrawerBackdrop onClick={onClose} />}
                <FocusTrap active={open}>
                    <DrawerRoot
                        elevation={elevation}
                        color={color as string}
                        variant={variant}
                        open={open}
                        anchor={anchor}
                        tabIndex={-1}
                        ref={ref}
                        role="dialog"
                        aria-modal="true"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        {...props}
                    >
                        {children}
                    </DrawerRoot>
                </FocusTrap>
            </>
        );
    },
);

Drawer.displayName = "Drawer";

export { Drawer };
