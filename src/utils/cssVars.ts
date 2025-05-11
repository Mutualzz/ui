import type { Theme } from "@emotion/react";

function flattenThemeToCssVars(
    theme: Theme,
    prefix = "",
): Record<string, string> {
    return Object.entries(theme).reduce(
        (acc, [key, val]) => {
            const varName = `--mz-${prefix}${key}`;
            if (val && typeof val === "object") {
                Object.assign(
                    acc,
                    flattenThemeToCssVars(val, `${prefix}${key}-`),
                );
            } else {
                acc[varName] = String(val);
            }
            return acc;
        },
        {} as Record<string, string>,
    );
}

export function generateCssVars(theme: Theme) {
    const vars = flattenThemeToCssVars(theme);
    return Object.entries(vars)
        .map(([name, value]) => `${name}: ${value};`)
        .join("\n");
}
