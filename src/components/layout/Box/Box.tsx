import type { BoxProps } from "./Box.types";

import styled from "@emotion/styled";

export const Box = styled("div")<BoxProps>(
    ({
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
        py,
        px,
        my,
        mx,
    }) => ({
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
    }),
);
