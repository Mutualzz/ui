import { ThemeProvider as EmotionThemeProvder } from "@emotion/react";
import {
    createContext,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";
import { themesObj } from "./themes";
import type { Theme, ThemeMode } from "./types";

import { useMedia } from "react-use";

export const ThemeContext = createContext<{
    theme: Theme;
    changeTheme: (theme: string) => void;
    mode: ThemeMode;
    changeMode: (mode: ThemeMode) => void;
}>({
    theme: themesObj["baseDark"],
    changeTheme: (_theme: string) => {},
    mode: "system",
    changeMode: (_mode: ThemeMode) => {},
});

export const ThemeProvider = ({
    children,
    themes = themesObj,
}: PropsWithChildren & { themes?: Record<string, Theme> }) => {
    const [theme, setTheme] = useState<string | null>(null);
    const [mode, setMode] = useState<"light" | "dark" | "system">("system");
    const prefersDark = useMedia("(prefers-color-scheme: dark)");

    const changeMode = (mode: ThemeMode) => {
        setMode(mode);
        if (mode === "system") setTheme(prefersDark ? "baseDark" : "baseLight");
        else setTheme(mode === "dark" ? "baseDark" : "baseLight");
    };

    const themeObject =
        themes[theme ? theme : mode === "dark" ? "baseDark" : "baseLight"];

    const changeTheme = (theme: string) => {
        setTheme(theme);
    };

    const value = useMemo(
        () => ({
            theme: themeObject,
            changeTheme,
            mode,
            changeMode,
        }),
        [theme, mode],
    );

    return (
        <ThemeContext.Provider value={value}>
            <EmotionThemeProvder theme={themeObject}>
                {children}
            </EmotionThemeProvder>
        </ThemeContext.Provider>
    );
};
