import { Paper } from "@components/Paper/Paper";
import { Portal } from "@components/Portal/Portal";
import { Stack } from "@components/Stack/Stack";
import styled from "@styled";
import type { Responsive, Size, SizeValue } from "@ui-types";
import { resolveResponsiveMerge } from "@utils/responsive";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { resolvePopoverSize, resolvePopoverStyles } from "./Popover.helpers";
import type { PopoverProps } from "./Popover.types";

const PopoverRoot = styled("div")({
    position: "relative",
    display: "inline-block",
});

const PopoverTrigger = styled(Stack)();

const PopoverContent = styled(Paper)<{
    usePortal?: boolean;
    top?: number;
    left?: number;
    size: Responsive<Size | SizeValue | number>;
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
        transition: "all 0.3s ease",

        borderRadius: 4,
        zIndex: theme.zIndex.tooltip,
        whiteSpace: "nowrap",
        ...resolveResponsiveMerge(
            theme,
            {
                color,
                textColor,
                elevation,
                variant,
                size,
            },
            ({
                color: c,
                textColor: tc,
                elevation: e,
                size: s,
                variant: v,
            }) => ({
                ...resolvePopoverSize(theme, s),
                ...resolvePopoverStyles(theme, c, tc, e)[v],
            }),
        ),
    }),
);

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            color = "neutral",
            variant = "solid",
            size = "md",
            content,
            children,
            isOpen: isOpenProp,
            usePortal = true,
            ...props
        },
        ref,
    ) => {
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
                color={color as string}
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
            <PopoverRoot ref={ref}>
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
    },
);

Popover.displayName = "Popover";

export { Popover };
