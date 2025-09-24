import styled from "@emotion/native";
import { normalizeTypography } from "@utils";
import { Text, type TextStyle } from "react-native";
import type { TypographyProps } from "web";
import { resolveTypographStyles } from "./Typography.helpers";

const Typography = styled(Text)<TypographyProps<"native">>(
    ({
        theme,
        level = "inherit",
        color = "primary",
        textColor = "primary",
        variant = "none",
        weight,
    }) => ({
        ...(weight && { fontWeight: weight }),
        ...((level !== "inherit" &&
            normalizeTypography(theme.typography.levels[level])) as TextStyle),
        ...resolveTypographStyles(theme, color, textColor)[variant],
    }),
);

Typography.displayName = "Typography";

export { Typography };
