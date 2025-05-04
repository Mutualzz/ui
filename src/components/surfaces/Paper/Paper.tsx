import styled from "@emotion/styled";
import { dynamicElevation } from "@root/utils/dynamicElevation";
import type { PaperProps } from "./Paper.types";

export const Paper = styled("div")<PaperProps>`
    background-color: ${({ theme, elevation = 0 }) =>
        dynamicElevation(theme.colors.surface, elevation)};
    box-shadow: ${({ elevation = 0 }) =>
        `0 ${elevation + 1}px ${elevation * 2}px rgba(0,0,0,${elevation * 0.1})`};
    border-radius: 0.75rem;
    transition: all 0.2 ease;
    display: ${({ display }) => display};
    flex-direction: ${({ direction }) => direction};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
    align-content: ${({ alignContent }) => alignContent};
    flex-wrap: ${({ wrap }) => wrap};
    gap: ${({ spacing }) => spacing};
    padding: ${({ p }) => p};
    margin: ${({ m }) => m};
    order: ${({ order }) => order};
    flex-grow: ${({ grow }) => grow};
    flex-shrink: ${({ shrink }) => shrink};
    flex-basis: ${({ basis }) => basis};
    flex: ${({ flex }) => flex};
    align-self: ${({ alignSelf }) => alignSelf};
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
