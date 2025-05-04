import type { BoxProps } from "./Box.types";

import styled from "@emotion/styled";

export const Box = styled("div")<BoxProps>`
    display: ${({ display }) => display ?? "block"};
    position: ${({ position }) => position ?? "relative"};
    padding: ${({ p }) => p};
    margin: ${({ m }) => m};
    top: ${({ top }) => top};
    right: ${({ right }) => right};
    bottom: ${({ bottom }) => bottom};
    left: ${({ left }) => left};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-top: ${({ pt }) => pt};
    padding-right: ${({ pr }) => pr};
    padding-bottom: ${({ pb }) => pb};
    padding-left: ${({ pl }) => pl};
    margin-top: ${({ mt }) => mt};
    margin-right: ${({ mr }) => mr};
    margin-bottom: ${({ mb }) => mb};
    margin-left: ${({ ml }) => ml};
    padding-block: ${({ py }) => py};
    padding-inline: ${({ px }) => px};
    margin-block: ${({ my }) => my};
    margin-inline: ${({ mx }) => mx};
`;
