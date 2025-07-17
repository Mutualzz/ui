import styled from "@styled";
import type { Size } from "@ui-types";
import type { ReactNode } from "react";

const IconWrapper = styled("span")<{
    position: "start" | "end";
    size?: Size | number;
    childrenContent?: ReactNode;
}>(({ position, size, childrenContent }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: size === "sm" ? "1.2em" : size === "lg" ? "1.5em" : "1.3em",
    marginLeft: childrenContent && position === "end" ? "0.25em" : 0,
    marginRight: childrenContent && position === "start" ? "0.25em" : 0,
    flexShrink: 0,
    flexGrow: 0,
}));

IconWrapper.displayName = "IconWrapper";

export { IconWrapper };
