import { Global } from "@emotion/react";
import { lighten } from "@utils";
import { formatHex } from "culori";
import { useTheme } from "./hooks/useTheme";

interface CssBaselineProps {
    adaptiveScrollbar?: boolean;
}

export const CssBaseline = ({ adaptiveScrollbar }: CssBaselineProps) => {
    const { theme } = useTheme();

    return (
        <Global
            styles={{
                "*, *::before, *::after": {
                    boxSizing: "border-box",
                },
                "html, body": {
                    margin: 0,
                    padding: 0,

                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.levels["body-md"].fontSize,
                    lineHeight: theme.typography.levels["body-md"].lineHeight,
                    backgroundColor: theme.colors.background,
                    color: theme.typography.colors.primary,
                },

                "img, video, svg": {
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                },

                "button, input, textarea, select": {
                    fontFamily: "inherit",
                },

                ...(adaptiveScrollbar && {
                    "*": {
                        scrollbarWidth: "auto",
                        scrollbarColor: `${theme.colors.neutral} ${theme.colors.surface}`,
                    },
                    "::-webkit-scrollbar": {
                        width: 8,
                        height: 8,
                    },
                    "::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.colors.neutral,
                        borderRadius: 4,
                    },
                    "::-webkit-scrollbar-track": {
                        backgroundColor: theme.colors.surface,
                    },
                    "::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: formatHex(
                            lighten(theme.colors.neutral, 0.2),
                        ),
                    },
                }),
            }}
        />
    );
};
