import styled from "@styled";
import type { Orientation } from "@ui-types";
import { isCssMarker } from "@utils";
import { ListContext } from "components/List/List.context";
import { useContext } from "react";
import { NestedListContext } from "../List/NestedList.context";
import { resolveListItemStyles, resolveListSize } from "./ListItem.helpers";
import type { ListItemProps } from "./ListItem.types";

const ListItemRoot = styled("li")<
    ListItemProps & {
        nesting: number;
        orientation?: Orientation;
    }
>(
    ({
        theme,
        variant = "plain",
        color = "neutral",
        size = "md",
        orientation = "vertical",
        marker,
    }) => ({
        display: isCssMarker(marker)
            ? orientation === "vertical"
                ? "list-item"
                : "inline list-item"
            : orientation === "vertical"
              ? "flex"
              : "inline-flex",
        alignItems: !isCssMarker(marker) ? "center" : undefined,
        position: "relative",
        paddingBlock: marker ? "0.5em" : undefined,
        listStylePosition: isCssMarker(marker) ? "inside" : undefined,
        listStyleType: isCssMarker(marker) ? marker : "none",
        boxSizing: "border-box",

        "::marker": {
            ...resolveListItemStyles(theme, color)[variant],
        },

        ...resolveListSize(theme, size),
        ...resolveListItemStyles(theme, color)[variant],
    }),
);

export const ListItem = (props: ListItemProps & { marker?: string }) => {
    const nesting = useContext(NestedListContext);
    const { marker, color, orientation, size, variant } =
        useContext(ListContext);
    const {
        children,
        startDecorator,
        endDecorator,
        color: colorOverride,
        marker: markerOverride,
        size: sizeOverride,
        variant: variantOverride,
        ...rest
    } = props;

    let markerToUse: string | undefined;
    if (markerOverride !== undefined) markerToUse = markerOverride;
    else if (typeof marker === "function") markerToUse = marker(nesting);
    else if (Array.isArray(marker))
        markerToUse = marker[nesting] ?? marker[marker.length - 1];
    else if (typeof marker === "string") markerToUse = marker;

    const shouldRenderCustomMarker =
        !isCssMarker(markerToUse) &&
        markerToUse !== undefined &&
        markerToUse !== "";

    return (
        <ListItemRoot
            nesting={nesting}
            color={colorOverride ?? color}
            variant={variantOverride ?? variant}
            size={sizeOverride ?? size}
            orientation={orientation}
            marker={markerToUse}
            {...rest}
        >
            {startDecorator}
            {shouldRenderCustomMarker && <span>{markerToUse}</span>}
            {children}
            {endDecorator}
        </ListItemRoot>
    );
};
