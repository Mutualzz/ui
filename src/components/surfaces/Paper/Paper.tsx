import styled from "../../../utils/styled";
import { variantStyles } from "./Paper.helpers";
import { type PaperProps } from "./Paper.types";

export const Paper = styled("div")<PaperProps>(
    ({ theme, variant = "elevation", elevation = 0, color = "neutral" }) => ({
        ...variantStyles(theme, color, elevation)[variant],
        transition: "background-color 0.2 ease",
    }),
);
