import { Paper } from "@components/Paper/Paper";
import { Portal } from "@components/Portal/Portal";
import { Stack } from "@components/Stack/Stack";
import styled from "@styled";
import type { Size, SizeValue } from "@ui-types";
import { useLayoutEffect, useRef, useState } from "react";
import { resolvePopoverSize, resolvePopoverStyles } from "./Popover.helpers";
import type { PopoverProps } from "./Popover.types";

const PopoverRoot = styled("div")({
    position: "relative",
    display: "inline-block",
});

const PopoverTrigger = styled(Stack)();

// TODO: Finish the styling for colors (add helpers for it)

const PopoverContent = styled(Paper)<{
    usePortal?: boolean;
    top?: number;
    left?: number;
    size: Size | SizeValue | number;
}>(
    ({
        theme,
        usePortal,
        top,
        left,
        size,
        color = "neutral",
        variant = "elevation",
        elevation = 0,
        textColor = "inherit",
    }) => ({
        position: "absolute",
        top: usePortal ? top : "100%",
        left: usePortal ? left : "50%",
        transform: "translateX(-50%)",
        marginTop: usePortal ? 0 : 10,

        borderRadius: 4,
        zIndex: theme.zIndex.tooltip,
        whiteSpace: "nowrap",
        ...resolvePopoverSize(theme, size),
        ...resolvePopoverStyles(theme, color, textColor, elevation)[variant],
    }),
);

const Popover = ({
    color = "neutral",
    variant = "solid",
    size = "md",
    content,
    children,
    isOpen: isOpenProp,
    usePortal = true,
    ...props
}: PopoverProps) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isControlled = isOpenProp !== undefined;
    const isOpen = isControlled ? isOpenProp : visible;

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;

            setPosition({
                top: rect.bottom + scrollTop + 10,
                left: rect.left + scrollLeft + rect.width / 2,
            });
        }
    };

    useLayoutEffect(() => {
        if (isOpen && usePortal) {
            updatePosition();

            const handleScroll = () => updatePosition();
            const handleResize = () => updatePosition();

            window.addEventListener("scroll", handleScroll, true);
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("scroll", handleScroll, true);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [isOpen, usePortal]);

    const toggleVisibility = () => {
        if (!isControlled) {
            setVisible((prev) => !prev);
        }
    };

    const popoverContent = isOpen && (
        <PopoverContent
            {...props}
            ref={contentRef}
            color={color}
            variant={variant}
            size={size}
            usePortal={usePortal}
            top={position.top}
            left={position.left}
        >
            {content}
        </PopoverContent>
    );

    return (
        <PopoverRoot>
            <PopoverTrigger ref={triggerRef} onClick={toggleVisibility}>
                {children}
            </PopoverTrigger>
            {usePortal ? (
                <Portal disablePortal={!isOpen}>{popoverContent}</Portal>
            ) : (
                popoverContent
            )}
        </PopoverRoot>
    );
};

Popover.displayName = "Popover";

export { Popover };
