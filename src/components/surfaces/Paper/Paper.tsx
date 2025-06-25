import styled from "../../../utils/styled";
import { variantStyles } from "./Paper.helpers";
import { type PaperProps } from "./Paper.types";

export const Paper = styled("div")<PaperProps>(
    ({
        theme,
        display,
        variant = "elevation",
        elevation = 0,
        color = "neutral",
    }) => ({
        ...(!display && { display: "flex" }),
        transition: "background-color 0.2s ease",
        ...variantStyles(theme, color, elevation)[variant],
    }),
);
