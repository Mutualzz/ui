import styled from "@styled";
import type { Orientation } from "@ui-types";
import { useContext } from "react";
import { DecoratorWrapper } from "../DecoratorWrapper/DecoratorWrapper";
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
>(({ theme, size = "md", color = "primary", variant = "solid" }) => ({
    width: "100%",
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
    }),
}));

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
    transition: "all 0.3s ease",
});

export const ListItemButton = (props: ListItemButtonProps) => {
    const nesting = useContext(NestedListContext);

    const { color, orientation, size, variant } = useContext(ListContext);
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
                <DecoratorWrapper position="start">
                    {startDecorator}
                </DecoratorWrapper>
            )}
            <ListItemButtonContent>{children}</ListItemButtonContent>
            {endDecorator && (
                <DecoratorWrapper position="end">
                    {endDecorator}
                </DecoratorWrapper>
            )}
        </ListItemButtonRoot>
    );
};
