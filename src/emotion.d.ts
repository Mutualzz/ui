import "@emotion/react";
import { Theme as MzTheme } from "@root/types";

declare module "@emotion/react" {
    export type Theme = MzTheme;
}
