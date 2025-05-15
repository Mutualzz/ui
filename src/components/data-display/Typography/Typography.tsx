import styled from "../../../utils/styled";

import { variantStyles } from "./Typography.helpers";
import { type TypographyProps } from "./Typography.types";

export const Typography = styled("span")<TypographyProps>(
    ({
        theme,
        level = "body-md",
        color = "#fff",
        variant = "none",
        weight,
    }) => ({
        ...variantStyles(theme, color)[variant],
        ...theme.typography.levels[level],
        padding: 8,
        fontWeight: weight,
    }),
);
