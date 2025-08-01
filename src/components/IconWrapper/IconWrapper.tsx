import styled from "@styled";
import type { Size } from "@ui-types";
import type { ReactNode } from "react";

const IconWrapper = styled("span")<{
    position: "start" | "end";
    size?: Size | number;
    parentContent?: ReactNode;
    spacing?: string | number;
}>(({ position, size, parentContent, spacing = "0.25em" }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: size === "sm" ? "1.2em" : size === "lg" ? "1.5em" : "1.3em",
    paddingLeft: parentContent && position === "end" ? spacing : 0,
    paddingRight: parentContent && position === "start" ? spacing : 0,
    flexShrink: 0,
    flexGrow: 0,
}));

IconWrapper.displayName = "IconWrapper";

export { IconWrapper };
