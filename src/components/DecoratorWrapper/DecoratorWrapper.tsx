import styled from "@styled";
import type { Size, SizeValue } from "@ui-types";
import { resolveSize } from "@utils";
import type { ReactNode } from "react";

const DecoratorWrapper = styled("span")<{
    position?: "start" | "end";
    size?: Size | SizeValue | number;
    parentContent?: ReactNode;
    spacing?: string | number;
}>(({ theme, position, size = "md", parentContent, spacing = "0.25em" }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontSize: resolveSize(theme, size, { sm: 12, md: 14, lg: 16 }),
    paddingLeft: parentContent && position === "end" ? spacing : 0,
    paddingRight: parentContent && position === "start" ? spacing : 0,
    flexShrink: 0,
    flexGrow: 0,
}));

DecoratorWrapper.displayName = "DecoratorWrapper";

export { DecoratorWrapper };
