import styled from "@styled";

import { resolveTypographStyles } from "./Typography.helpers";
import { type TypographyProps } from "./Typography.types";

/**
 * Typography component for displaying text with different styles.
 * It supports various levels, colors, variants, and weights.
 * The component can be used for headings, body text, captions, and more.
 */
const Typography = styled("span")<TypographyProps>(
    ({
        theme,
        level = "inherit",
        color = "#fff",
        variant = "none",
        weight,
    }) => ({
        ...(level === "inherit" ? {} : theme.typography.levels[level]),
        ...resolveTypographStyles(theme, color)[variant],
        fontWeight: weight,
        transition: "all 0.3s ease",
    }),
);

Typography.displayName = "Typography";

export { Typography };
