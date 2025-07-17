import { Global } from "@emotion/react";
import { useTheme } from "./hooks/useTheme";

export const CssBaseline = () => {
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
            }}
        />
    );
};
