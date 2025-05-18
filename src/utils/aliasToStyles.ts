import type { Theme } from "@emotion/react";
import { aliasMaps } from "./aliases";

export function aliasToStyles(props: Record<string, any>, theme: Theme) {
    const output: Record<string, any> = {};

    const resolveValue = (key: string, raw: any) => {
        if (raw == null) return raw;
        // NOTE - For now we are not going to be using the theme.spacing function
        /*if (/^[mp]/.test(key) && typeof raw === "number") {
            return theme.spacing(raw);
        }*/

        if (key === "boxShadow" && typeof raw === "number") {
            return theme.shadows[raw] ?? raw;
        }

        if (key === "zIndex" && typeof raw === "string") {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            return theme.zIndex[raw as keyof typeof theme.zIndex] ?? raw;
        }

        return raw;
    };

    for (const key in props) {
        const raw = props[key];
        if (raw == null) continue;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const cssProps = aliasMaps[key as keyof typeof aliasMaps]?.slice() ?? [
            key,
        ];

        if (typeof raw === "object" && !Array.isArray(raw)) {
            for (const bp in raw) {
                const val = raw[bp];
                const media = theme.breakpoints.up(bp as any);
                output[media] = output[media] ?? {};
                const resolved = resolveValue(key, val);
                cssProps.forEach((prop) => {
                    output[media][prop] = resolved;
                });
            }
        } else {
            const resolved = resolveValue(key, raw);
            cssProps.forEach((prop) => {
                output[prop] = resolved;
            });
        }
    }

    return output;
}
