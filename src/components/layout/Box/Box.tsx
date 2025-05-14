import styled from "../../../utils/styled";
import type { BoxProps } from "./Box.types";

export const Box = styled("div")<BoxProps>(({ inline }) => ({
    display: inline ? "inline-block" : "block",
}));
