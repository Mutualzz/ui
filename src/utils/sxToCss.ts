import { css, type Theme } from "@emotion/react";
import type { Properties as CSSProperties } from "csstype";
import type { Breakpoint } from "../types";

const aliasMap: Record<string, string[]> = {
    m: ["margin"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["padding"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
} as const;

type AliasMap = typeof aliasMap;
type AliasKey = keyof AliasMap;

type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export type SxProps = {
    [K in keyof CSSProperties]?: Responsive<CSSProperties[K]>;
} & {
    [K in AliasKey]?: Responsive<string | number>;
};

export function sxToCss(sx: SxProps = {}, theme: Theme) {
    const styles: Record<string, any> = {};

    for (const key in sx) {
        const raw = sx[key];
        const cssProps: string[] = (aliasMap as any)[key]?.slice() ?? [key];

        if (raw && typeof raw === "object" && !Array.isArray(raw)) {
            for (const bp in raw) {
                const val = (raw as any)[bp];
                const media = theme.breakpoints.up(bp as Breakpoint);
                cssProps.forEach((prop) => {
                    styles[media] = styles[media] || {};
                    styles[media][prop] =
                        typeof val === "number" && /^m|^p/.test(key)
                            ? theme.spacing(val)
                            : val;
                });
            }
        } else {
            cssProps.forEach((prop) => {
                const val = raw as string | number;
                styles[prop] =
                    typeof val === "number" && /^m|^p/.test(key)
                        ? theme.spacing(val)
                        : val;
            });
        }
    }

    return css(styles);
}
