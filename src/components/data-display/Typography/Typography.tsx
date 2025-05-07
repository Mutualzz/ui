import styled from "@emotion/styled";

import { variantStyles } from "./Typography.helpers";
import { type TypographyProps } from "./Typography.types";

export const Typography = styled.span<TypographyProps>(
    ({ theme, level = "body-md", color = "#fff", variant = "none" }) => ({
        ...variantStyles(theme, color)[variant],
        ...theme.typography.levels[level],
        padding: 4,
    }),
);
