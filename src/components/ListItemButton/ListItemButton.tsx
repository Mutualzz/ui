import styled from "@styled";
import type { Orientation } from "@ui-types";
import { resolveColor } from "@utils";
import { formatHex8 } from "culori";
import { useContext } from "react";
import { ListContext } from "../List/List.context";
import { NestedListContext } from "../List/NestedList.context";
import {
    resolveListItemButtonSize,
    resolveListItemButtonStyles,
} from "./ListItemButton.helpers";
import type { ListItemButtonProps } from "./ListItemButton.types";

export const ListItemButtonRoot = styled("button")<
    ListItemButtonProps & {
        nesting: number;
        orientation?: Orientation;
    }
>(
    ({
        theme,
        disabled,
        size = "md",
        orientation = "vertical",
        color = "primary",
        variant = "solid",
    }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 0,
        boxSizing: "border-box",
        transition: "all 0.3s ease",
        ...(disabled && { opacity: 0.5, pointerEvents: "none" }),
        ...resolveListItemButtonSize(theme, size),
        ...resolveListItemButtonStyles(theme, color)[variant],
        border: "none",
        ...(variant === "outlined" && {
            "&:not(:first-of-type)": {
                borderTop:
                    orientation === "vertical"
                        ? `1px solid ${formatHex8(resolveColor(color, theme))}`
                        : undefined,
                borderLeft:
                    orientation === "horizontal"
                        ? `1px solid ${formatHex8(resolveColor(color, theme))}`
                        : undefined,
            },
        }),
    }),
);

export const ListItemButton = (props: ListItemButtonProps) => {
    const nesting = useContext(NestedListContext);

    const { marker, color, orientation, size, variant } =
        useContext(ListContext);
    const {
        children,
        startDecorator,
        endDecorator,
        color: colorOverride,
        size: sizeOverride,
        variant: variantOverride,
        ...rest
    } = props;

    return (
        <ListItemButtonRoot
            nesting={nesting}
            color={colorOverride ?? color}
            variant={variantOverride ?? variant}
            size={sizeOverride ?? size}
            orientation={orientation}
            {...rest}
        >
            {startDecorator}
            {children}
            {endDecorator}
        </ListItemButtonRoot>
    );
};
