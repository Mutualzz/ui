import styled from "../../../utils/styled";
import { variantStyles } from "./Paper.helpers";
import { type PaperProps } from "./Paper.types";

export const Paper = styled("div")<PaperProps>(
    ({
        theme,
        variant = "elevation",
        elevation = 0,
        color = "neutral",
        inline,
    }) => ({
        ...variantStyles(theme, color, elevation)[variant],
        borderRadius: "0.75rem",
        transition: "all 0.2 ease",
        display: inline ? "inline-flex" : "flex",
    }),
);
