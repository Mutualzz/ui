import type { CSSObject, Theme } from "@emotion/react";
import type { Responsive } from "@ui-types";
import { resolveResponsiveMerge } from "@utils/responsive";
import { useCallback, useRef } from "react";
import type { DrawerAnchor } from "./Drawer.types";

const SWIPE_THRESHOLD = 60;

export const resolveAnchorStyles = (anchor: DrawerAnchor) => {
    switch (anchor) {
        case "left":
            return {
                top: 0,
                left: 0,
                height: "100%",
                width: 320,
                transform: "translateX(-100%)",
            };
        case "right":
            return {
                top: 0,
                right: 0,
                height: "100%",
                width: 320,
                transform: "translateX(100%)",
            };
        case "top":
            return {
                top: 0,
                left: 0,
                width: "100%",
                height: 320,
                transform: "translateY(-100%)",
            };
        case "bottom":
        default:
            return {
                bottom: 0,
                left: 0,
                width: "100%",
                height: 320,
                transform: "translateY(100%)",
            };
    }
};

export const resolveSwipeAreaStyles = (
    theme: Theme,
    anchor: DrawerAnchor,
): CSSObject => {
    const size = 24;

    switch (anchor) {
        case "left":
            return {
                position: "fixed",
                top: 0,
                left: 0,
                width: size,
                height: "100vh",
                zIndex: theme.zIndex.drawer - 1,
                touchAction: "pan-y",
            };
        case "right":
            return {
                position: "fixed",
                top: 0,
                right: 0,
                width: size,
                height: "100vh",
                zIndex: theme.zIndex.drawer - 1,
                touchAction: "pan-y",
            };
        case "top":
            return {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: size,
                zIndex: theme.zIndex.drawer - 1,
                touchAction: "pan-x",
            };
        case "bottom":
        default:
            return {
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                height: size,
                zIndex: theme.zIndex.drawer - 1,
                touchAction: "pan-x",
            };
    }
};

export const useSwipeableDrawer = ({
    theme,
    anchor,
    swipeable,
    open,
    onOpen,
    onClose,
}: {
    theme: Theme;
    anchor: Responsive<DrawerAnchor>;
    swipeable?: boolean;
    open: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}) => {
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const { resolvedAnchor } = resolveResponsiveMerge(
        theme,
        { anchor },
        ({ anchor: a }) => ({ resolvedAnchor: a }),
    );

    // For swipe-to-close (when open)
    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (!swipeable || !open) return;
            const touch = e.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
        },
        [swipeable, open],
    );

    const handleTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            if (!swipeable || !open || !touchStart.current) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStart.current.x;
            const dy = touch.clientY - touchStart.current.y;

            let shouldClose = false;
            if (resolvedAnchor === "left" && dx < -SWIPE_THRESHOLD)
                shouldClose = true;
            if (resolvedAnchor === "right" && dx > SWIPE_THRESHOLD)
                shouldClose = true;
            if (resolvedAnchor === "top" && dy < -SWIPE_THRESHOLD)
                shouldClose = true;
            if (resolvedAnchor === "bottom" && dy > SWIPE_THRESHOLD)
                shouldClose = true;

            if (shouldClose && onClose) onClose();
            touchStart.current = null;
        },
        [resolvedAnchor, swipeable, open, onClose],
    );

    // For swipe-to-open (when closed)
    const handleSwipeOpenStart = useCallback(
        (e: React.TouchEvent) => {
            if (!swipeable || open) return;
            const touch = e.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
        },
        [swipeable, open],
    );

    const handleSwipeOpenEnd = useCallback(
        (e: React.TouchEvent) => {
            if (!swipeable || open || !touchStart.current) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStart.current.x;
            const dy = touch.clientY - touchStart.current.y;

            let shouldOpen = false;
            if (resolvedAnchor === "left" && dx > SWIPE_THRESHOLD)
                shouldOpen = true;
            if (resolvedAnchor === "right" && dx < -SWIPE_THRESHOLD)
                shouldOpen = true;
            if (resolvedAnchor === "top" && dy > SWIPE_THRESHOLD)
                shouldOpen = true;
            if (resolvedAnchor === "bottom" && dy < -SWIPE_THRESHOLD)
                shouldOpen = true;

            if (shouldOpen && onOpen) onOpen();
            touchStart.current = null;
        },
        [resolvedAnchor, swipeable, open, onOpen],
    );

    return {
        resolvedAnchor,
        handleTouchStart,
        handleTouchEnd,
        handleSwipeOpenStart,
        handleSwipeOpenEnd,
    };
};
