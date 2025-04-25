import { ThemeProvider as EmotionThemeProvder } from "@emotion/react";
import {
    createContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";
import { themesObj } from "./themes";
import type { Theme } from "./types";

export const ThemeContext = createContext<{
    theme: Theme;
    changeTheme: (theme: string) => void;
}>({
    theme: themesObj["baseDark"],
    changeTheme: (_theme: string) => {},
});

export const ThemeProvider = ({
    children,
    themes = themesObj,
}: PropsWithChildren & { themes?: Record<string, Theme> }) => {
    const [theme, setTheme] = useState<string>("baseDark");

    const changeTheme = (theme: string) => {
        setTheme(theme);
    };

    const themeObject = themes[theme];

    const value = useMemo(
        () => ({
            theme: themeObject,
            changeTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={value}>
            <EmotionThemeProvder theme={themeObject}>
                {children}
            </EmotionThemeProvder>
        </ThemeContext.Provider>
    );
};
