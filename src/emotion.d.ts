import "@emotion/react";
import { Theme as MzTheme } from "./types";

declare module "@emotion/react" {
    export type Theme = MzTheme;
}
