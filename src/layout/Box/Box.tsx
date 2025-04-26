import type { FC } from "react";
import type { BoxProps } from "./Box.types";

export const Box: FC<BoxProps> = ({
    display = "block",
    position = "relative",
    top,
    right,
    bottom,
    left,
    width,
    height,
    p,
    m,
    pt,
    pr,
    pb,
    pl,
    mt,
    mr,
    mb,
    ml,
    px,
    py,
    mx,
    my,
    children,
    ...props
}) => (
    <div
        {...props}
        css={{
            display,
            position,
            padding: p,
            margin: m,
            top,
            right,
            bottom,
            left,
            width,
            height,
            paddingTop: pt,
            paddingRight: pr,
            paddingBottom: pb,
            paddingLeft: pl,
            marginTop: mt,
            marginRight: mr,
            marginBottom: mb,
            marginLeft: ml,
            paddingBlock: py,
            paddingInline: px,
            marginBlock: my,
            marginInline: mx,
        }}
    >
        {children}
    </div>
);
