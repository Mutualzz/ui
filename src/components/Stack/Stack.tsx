import styled from "../../utils/styled";
import type { BoxProps } from "../Box/Box.types";

export const Stack = styled("div")<BoxProps>(({ inline }) => ({
    display: inline ? "inline-flex" : "flex",
}));
