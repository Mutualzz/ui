import styled from "@styled";
import { useContext } from "react";

import { isCssMarker } from "@utils";
import { ListContext } from "./List.context";
import { resolveListStyles } from "./List.helpers";
import type { ListProps } from "./List.types";
import { NestedListContext } from "./NestedList.context";

const ListRoot = styled("ul")<
    ListProps & { nesting: number; cssMarker?: boolean }
>(
    ({
        theme,
        color = "neutral",
        orientation = "vertical",
        variant = "plain",
        nesting = 0,
        marker,
        cssMarker,
    }) => ({
        display: cssMarker ? "block" : "flex",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        width: "100%",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        flexGrow: 1,
        position: "relative",
        alignSelf: "flex-start",
        paddingLeft: nesting * 1.5 + "rem",
        listStyleType: isCssMarker(marker) ? marker : "none",
        ...resolveListStyles(theme, color)[variant],
    }),
);

export const List = (props: ListProps) => {
    const { marker, children, orientation, color, variant, size } = props;

    const parentNesting = useContext(NestedListContext);

    const cssMarker = typeof marker === "string" && isCssMarker(marker);

    return (
        <ListContext.Provider
            value={{
                color,
                variant,
                size,
                orientation,
                nesting: parentNesting + 1,
                marker,
            }}
        >
            <ListRoot {...props} nesting={parentNesting} cssMarker={cssMarker}>
                {children}
            </ListRoot>
        </ListContext.Provider>
    );
};
