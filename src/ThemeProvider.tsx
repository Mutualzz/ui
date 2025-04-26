import { ThemeProvider as EmotionThemeProvder } from "@emotion/react";
import {
    createContext,
    useEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from "react";
import { themesObj } from "./themes";
import type { Theme, ThemeContextInterface, ThemeMode } from "./types";

export const ThemeContext = createContext<ThemeContextInterface>({
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
    const [prefersDark, setPrefersDark] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (event: MediaQueryListEvent) => {
            setPrefersDark(event.matches);
            if (mode === "system")
                setTheme(event.matches ? "baseDark" : "baseLight");
        };

        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const changeMode = (mode: ThemeMode) => {
        setMode(mode);
        if (mode === "system") setTheme(prefersDark ? "baseDark" : "baseLight");
        else setTheme(mode === "dark" ? "baseDark" : "baseLight");
    };

    const themeObject =
        themes[theme ? theme : prefersDark ? "baseDark" : "baseLight"];

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
