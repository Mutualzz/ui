import styled from "@styled";
import type { Orientation } from "@ui-types";
import { resolveColor } from "@utils";
import { formatHex8 } from "culori";
import { useContext } from "react";
import { IconWrapper } from "../IconWrapper/IconWrapper";
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
        cursor: "pointer",
        transition: "all 0.3s ease",
        ...resolveListItemButtonSize(theme, size),
        ...resolveListItemButtonStyles(theme, color)[variant],
        ...(variant === "outlined" && {
            border: "none",
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

const ListItemButtonContent = styled("span")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    width: "auto",
    height: "100%",
    opacity: 1,
    boxSizing: "border-box",
});

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
            {startDecorator && (
                <IconWrapper
                    childrenContent={children}
                    position="start"
                    size={size}
                >
                    {startDecorator}
                </IconWrapper>
            )}
            <ListItemButtonContent>{children}</ListItemButtonContent>
            {endDecorator && (
                <IconWrapper
                    childrenContent={children}
                    position="end"
                    size={size}
                >
                    {endDecorator}
                </IconWrapper>
            )}
        </ListItemButtonRoot>
    );
};
