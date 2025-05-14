import { css, type Theme } from "@emotion/react";
import type { Properties as CSSProperties } from "csstype";
import type { Responsive } from "../types";
import { type AliasKey } from "./aliases";
import { aliasToStyles } from "./aliasToStyles";

export type SxProps = {
    [K in keyof CSSProperties]?: Responsive<CSSProperties[K]>;
} & {
    [K in AliasKey]?: Responsive<string | number>;
};

export function sxToCss(sx: SxProps = {}, theme: Theme) {
    return css(aliasToStyles(sx, theme));
}
