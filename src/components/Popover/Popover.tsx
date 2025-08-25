import { Paper } from "@components/Paper/Paper";
import { Portal } from "@components/Portal/Portal";
import { Stack } from "@components/Stack/Stack";
import type { CSSObject } from "@emotion/react";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import styled from "@styled";
import type { Responsive, Size, SizeValue } from "@ui-types";
import { clamp } from "@utils";
import { resolveResponsiveMerge } from "@utils/responsive";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import {
    getBestPlacement,
    getPopoverPosition,
    resolvePopoverSize,
    resolvePopoverStyles,
} from "./Popover.helpers";
import type { PopoverPlacement, PopoverProps } from "./Popover.types";

const PopoverRoot = styled("div")({
    position: "relative",
    display: "inline-block",
});

const PopoverTrigger = styled(Stack)();

const PopoverContent = styled(Paper)<{
    usePortal?: boolean;
    top?: number;
    left?: number;
    placement?: "top" | "bottom" | "left" | "right";
    size: Responsive<Size | SizeValue | number>;
}>(({
    theme,
    usePortal,
    top,
    left,
    size,
    color = "neutral",
    textColor = "primary",
    variant = "elevation",
    elevation = 0,
    placement = "bottom",
}) => {
    const baseStyles: CSSObject = {
        position: "absolute",
        transition:
            "opacity 0.2s ease, transform 0.2s cubic-bezier(0.4,0,0.2,1)",
        borderRadius: 4,
        zIndex: theme.zIndex.tooltip,
        whiteSpace: "nowrap",
    };

    if (usePortal) {
        if (placement === "top" || placement === "bottom") {
            baseStyles.top = top;
            baseStyles.left = left;
        } else {
            baseStyles.top = top;
            baseStyles.left = left;
        }
    } else {
        if (placement === "bottom") {
            baseStyles.top = "100%";
            baseStyles.left = "50%";
            baseStyles.marginTop = 10;
        } else if (placement === "top") {
            baseStyles.bottom = "100%";
            baseStyles.left = "50%";
            baseStyles.marginBottom = 10;
        } else if (placement === "left") {
            baseStyles.top = "50%";
            baseStyles.right = "100%";
            baseStyles.marginRight = 10;
        } else {
            baseStyles.top = "50%";
            baseStyles.left = "100%";
            baseStyles.marginLeft = 10;
        }
    }

    return {
        ...baseStyles,
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
    };
});

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            color = "neutral",
            variant = "solid",
            size = "md",
            trigger,
            children,
            isOpen: isOpenProp,
            usePortal = true,
            closeOnClickOutside = true,
            placement: placementProp,
            ...props
        },
        ref,
    ) => {
        const [visible, setVisible] = useState(false);
        const [position, setPosition] = useState({ top: 0, left: 0 });
        const [internalPlacement, setInternalPlacement] =
            useState<PopoverPlacement>("bottom");
        const triggerRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const isControlled = isOpenProp !== undefined;
        const isOpen = isControlled ? isOpenProp : visible;

        const placement = placementProp ?? internalPlacement;

        const updatePosition = () => {
            if (!triggerRef.current || !contentRef.current) return;
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const popoverRect = contentRef.current.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const bestPlacement = getBestPlacement(
                triggerRect,
                popoverRect,
                viewportWidth,
                viewportHeight,
            );
            setInternalPlacement(bestPlacement);

            const bestPosition = getPopoverPosition(
                bestPlacement,
                triggerRect,
                popoverRect,
                scrollTop,
                scrollLeft,
            );

            const clampedPosition = {
                top: clamp(
                    bestPosition.top,
                    0,
                    viewportHeight - popoverRect.height,
                ),
                left: clamp(
                    bestPosition.left,
                    0,
                    viewportWidth - popoverRect.width,
                ),
            };

            setPosition(clampedPosition);
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

        useLayoutEffect(() => {
            if (isOpen) {
                // Wait for the popover content to be rendered, then measure
                requestAnimationFrame(() => {
                    updatePosition();
                });
            }
        }, [isOpen, usePortal, trigger]);

        const toggleVisibility = () => {
            if (!isControlled) setVisible((prev) => !prev);
        };

        useOnClickOutside([contentRef, triggerRef] as any[], () => {
            if (closeOnClickOutside) setVisible(false);
        });

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
                placement={placement}
            >
                {children}
            </PopoverContent>
        );

        return (
            <PopoverRoot ref={ref}>
                <PopoverTrigger ref={triggerRef} onClick={toggleVisibility}>
                    {trigger}
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
