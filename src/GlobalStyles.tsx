import { css, Global } from "@emotion/react";
import { useTheme } from "./hooks/useTheme";

export const GlobalStyles = () => {
    const { theme } = useTheme();

    return (
        <Global
            styles={css`
                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                    font-family: ${theme.typography.fontFamily};
                }

                html,
                body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;

                    font-family: ${theme.typography.fontFamily};
                    font-size: ${theme.typography.levels["body-md"].fontSize};
                    line-height: ${theme.typography.levels["body-md"]
                        .lineHeight};
                    background-color: ${theme.colors.background};
                    color: ${theme.typography.colors.primary};
                }

                #app {
                    min-height: 100vh;
                    width: 100%;
                    box-sizing: border-box;
                }

                ul,
                ol {
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }

                img,
                video,
                svg {
                    max-width: 100%;
                    height: auto;
                    display: block;
                }
            `}
        />
    );
};
